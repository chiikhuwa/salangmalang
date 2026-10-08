"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import TabBar from "./TabBar";
import WishlistItem from "./WishlistItem";
import IconifyIcon from "./IconifyIcon";
import Modal from "./Modal";
import ProductDetails from "./ProductDetails";
import ProductForm from "./ProductForm";
import AddProductOptions from "./AddProductOptions";
import VoteScreen from "./VoteScreen";
import ProfileScreen from "./ProfileScreen";
import Toast from "./Toast";
import { sampleProducts } from "../lib/sampleProducts";

export default function DemoApp({ signedInUser, isDemo, loginReady, error }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [collection, setCollection] = useState("wishlist");
  const [products, setProducts] = useState([null, ...sampleProducts.slice(1)]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addStep, setAddStep] = useState(null);
  const [ocrState, setOcrState] = useState(null);
  const imagePickerRef = useRef(null);
  const ocrTimer = useRef(null);
  const toastTimer = useRef(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(error ? "로그인이 완료되지 않았어요. 다시 시도해 주세요." : "");
  const demoUser = isDemo ? { name: "데모", email: "demo@example.com", demo: true } : null;
  const user = signedInUser || demoUser;

  const isVoteScreen = Boolean(user && activeTab === "home" && collection === "vote");

  useEffect(() => () => {
    clearTimeout(ocrTimer.current);
    clearTimeout(toastTimer.current);
  }, []);

  function selectAddMethod(method) {
    if (method === "image") {
      setAddStep(null);
      imagePickerRef.current?.click();
    } else {
      setAddStep("link");
    }
  }

  function analyzeImage(event) {
    if (!event.target.files?.length) return;
    event.target.value = "";
    clearTimeout(ocrTimer.current);
    clearTimeout(toastTimer.current);
    setOcrState("analyzing");
    ocrTimer.current = setTimeout(() => {
      setProducts((items) => [sampleProducts[0], ...items.slice(1)]);
      setOcrState("done");
      toastTimer.current = setTimeout(() => setOcrState(null), 3000);
    }, 7000);
  }

  function changeCollection(nextCollection) {
    setCollection(nextCollection);
    setSelectedProduct(null);
  }

  function addProduct(product) {
    setProducts((items) => [...items, product]);
    setAddStep(null);
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
    clearTimeout(ocrTimer.current);
    clearTimeout(toastTimer.current);
    setOcrState(null);
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
    <main className={`app malang-app ${user ? "with-tabs" : ""} ${isVoteScreen ? "vote-mode" : ""} ${user && activeTab === "profile" ? "profile-mode" : ""}`}>
      {(!user || activeTab !== "1profile") && <header className="brand-header">
        <img src="/logo2.png" className="brand-logo" width="320" height="320" />
        {user && activeTab === "home" && (
          <div className="home-menu" role="tablist">
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
      </header>}
      {user ? (
        <>
          <section className="content app-content" key={activeTab}>
            {activeTab === "home" && collection === "wishlist" && (
              <div
                className="home-screen"
                role="tabpanel"
                id={`collection-panel-${collection}`}
                aria-labelledby={`collection-tab-${collection}`}
              >
                <div className="wishlist-grid">
                  {products.map((product, index) => product ? (
                    <WishlistItem key={product.id} product={product} onSelect={setSelectedProduct} />
                  ) : (
                    <div key={`empty-${index}`} className="wishlist-item empty-slot" role="img" />
                  ))}
                </div>
                <button type="button" className="add-product" aria-haspopup="dialog" onClick={() => setAddStep("choose")}>
                  <IconifyIcon name="plus" size={24} />
                </button>
                <img className="wishlist-cart" src="/cart.png" width="1400px" height="1400px" />
              </div>
            )}
            {isVoteScreen && (
              <VoteScreen product={products[0] ?? sampleProducts[0]} nextProduct={products[1] ?? sampleProducts[1]} />
            )}
            {activeTab === "profile" && (
              <ProfileScreen user={user} busy={busy} message={message} onLogout={logout} />
            )}
          </section>
          <TabBar activeTab={activeTab} onChange={setActiveTab} />
          <input ref={imagePickerRef} className="image-picker" type="file" accept="image/*" hidden onChange={analyzeImage} />
          <Toast state={ocrState} />
          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
          {addStep === "choose" && (
            <AddProductOptions onSelect={selectAddMethod} onClose={() => setAddStep(null)} />
          )}
          {addStep === "link" && (
            <Modal titleId="add-product-title" onClose={() => setAddStep(null)}>
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
