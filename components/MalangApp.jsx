"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import TabBar from "./TabBar";
import WishlistItem from "./WishlistItem";
import IconifyIcon from "./IconifyIcon";
import Modal from "./Modal";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import { sampleProducts } from "../lib/sampleProducts";

export default function DemoApp({ signedInUser, isDemo, loginReady, error }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [collection, setCollection] = useState("wishlist");
  const [products, setProducts] = useState(sampleProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [votedIds, setVotedIds] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(error ? "로그인이 완료되지 않았어요. 다시 시도해 주세요." : "");
  const demoUser = isDemo ? { name: "데모", email: "demo@example.com", demo: true } : null;
  const user = signedInUser || demoUser;

  const visibleProducts = collection === "wishlist" ? products : [...sampleProducts].reverse();
  const votedProducts = sampleProducts.filter((product) => votedIds.includes(product.id));

  function toggleVote(productId) {
    setVotedIds((ids) => ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]);
  }

  function changeCollection(nextCollection) {
    setCollection(nextCollection);
    setSelectedProduct(null);
  }

  function addProduct(product) {
    setProducts((items) => [...items, product]);
    setAddingProduct(false);
  }

  async function login() {
    if (!loginReady) {
      setMessage("네이버 로그인 설정 전이에요. 아래 데모 버튼으로 체험해 보세요.");
      return;
    }
    setBusy(true);
    try {
      await signIn("naver", { callbackUrl: "/" });
    } catch {
      setMessage("로그인을 시작하지 못했어요. 다시 시도해 주세요.");
      setBusy(false);
    }
  }

  async function logout() {
    if (user.demo) {
      router.replace("/");
      setActiveTab("home");
      setSelectedProduct(null);
      return;
    }
    setBusy(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      setMessage("로그아웃하지 못했어요. 다시 시도해 주세요.");
      setBusy(false);
    }
  }

  return (
    <main className={`app malang-app ${user ? "with-tabs" : ""}`}>
      <header className="brand-header">
        <img src="/logo.png" alt="살랑말랑" className="brand-logo" width="320" height="320" />
        {user && activeTab === "home" && (
          <div className="home-menu" role="tablist" aria-label="위시리스트 메뉴">
            {[{ id: "wishlist", label: "My Wishlist" }, { id: "vote", label: "투표하기" }].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`collection-tab-${id}`}
                className="home-menu-item"
                aria-selected={collection === id}
                aria-controls={`collection-panel-${collection}`}
                tabIndex={collection === id ? 0 : -1}
                onClick={() => changeCollection(id)}
                onKeyDown={(event) => {
                  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  const next = event.key === "Home" ? "wishlist" : event.key === "End" ? "vote" : collection === "wishlist" ? "vote" : "wishlist";
                  changeCollection(next);
                  document.getElementById(`collection-tab-${next}`)?.focus();
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>
      {user ? (
        <>
          <section className="content app-content" key={activeTab}>
            {activeTab === "home" && (
              <div
                className="home-screen"
                role="tabpanel"
                id={`collection-panel-${collection}`}
                aria-labelledby={`collection-tab-${collection}`}
              >
                <div className="wishlist-grid" aria-label={collection === "wishlist" ? "내 위시리스트 상품" : "투표할 샘플 상품"}>
                  {visibleProducts.map((product) => (
                    <WishlistItem key={product.id} product={product} onSelect={setSelectedProduct} />
                  ))}
                </div>
                {collection === "wishlist" ? (
                  <button type="button" className="add-product" aria-label="상품 추가" aria-haspopup="dialog" onClick={() => setAddingProduct(true)}>
                    <IconifyIcon name="plus" size={24} />
                  </button>
                ) : (
                  <p className="vote-hint">상품을 눌러 마음에 드는 아이템에 투표해 주세요.</p>
                )}
                <img className="wishlist-cart" src="/cart.png" alt="위시리스트 상품을 담을 옆모습의 쇼핑 카트" width="1200" height="810" />
              </div>
            )}
            {activeTab === "medal" && (
              <div className="account-screen">
                <div className="section-icon"><IconifyIcon name="medal" size={36} /></div>
                <h1>나의 투표</h1>
                <p className="description">마음에 들어 응원한 상품을 모았어요.</p>
                {votedProducts.length ? (
                  <div className="wishlist-grid" aria-label="투표한 상품">
                    {votedProducts.map((product) => <WishlistItem key={product.id} product={product} onSelect={setSelectedProduct} />)}
                  </div>
                ) : (
                  <p className="empty-message">아직 투표한 상품이 없어요.</p>
                )}
                <button type="button" className="secondary" onClick={() => { setActiveTab("home"); changeCollection("vote"); }}>투표하러 가기</button>
              </div>
            )}
            {activeTab === "profile" && (
              <div className="account-screen">
                <div className="section-icon"><IconifyIcon name="profile" size={36} /></div>
                <h1>프로필</h1>
                <p className="description">{user.name}님의 계정</p>
                <p>{user.email || "이메일이 제공되지 않았어요."}</p>
                <div className="actions">
                  {message && <p role="alert" className="message">{message}</p>}
                  <button className="secondary" onClick={logout} disabled={busy}>
                    {busy ? "로그아웃 중…" : user.demo ? "데모 체험 종료" : "로그아웃"}
                  </button>
                </div>
              </div>
            )}
          </section>
          <TabBar activeTab={activeTab} onChange={setActiveTab} />
          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              voting={activeTab === "home" && collection === "vote"}
              voted={votedIds.includes(selectedProduct.id)}
              onVote={() => toggleVote(selectedProduct.id)}
            />
          )}
          {addingProduct && (
            <Modal titleId="add-product-title" onClose={() => setAddingProduct(false)}>
              <ProductForm onSubmit={addProduct} />
            </Modal>
          )}
        </>
      ) : (
        <section className="content login-content">
          <h1>로그인</h1>
          <p className="description">네이버 계정으로 간편하게 시작하세요.</p>
          <div className="actions">
            {message && <p role="alert" className="message">{message}</p>}
            <button className="naver" onClick={login} disabled={busy}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M15.2 3v9.6L8.5 3H2v18h6.8v-9.6l6.7 9.6H22V3z" />
              </svg>
              {busy ? "네이버로 이동 중…" : "네이버로 시작하기"}
            </button>
            <button className="secondary" onClick={() => router.push("/onboarding?demo=1")} disabled={busy}>
              먼저 데모 둘러보기
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
