"use client";

import { useState } from "react";
import { sampleProducts } from "../lib/sampleProducts";

export default function ProductForm({ method, onSubmit }) {
  const [imageId, setImageId] = useState(sampleProducts[0].id);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageError, setImageError] = useState("");

  function selectImage(event) {
    const file = event.target.files?.[0];
    setUploadedImage("");
    setImageError("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setImageError("5MB 이하의 JPG, PNG, WebP, GIF 이미지를 선택해 주세요.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(String(reader.result));
    reader.onerror = () => setImageError("이미지를 읽지 못했어요. 다시 선택해 주세요.");
    reader.readAsDataURL(file);
  }

  function submit(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const title = String(fields.get("title")).trim();
    if (!title || imageError) return;
    const sample = sampleProducts.find((product) => product.id === imageId);
    onSubmit({
      ...sample,
      id: crypto.randomUUID(),
      title,
      image: uploadedImage || sample.image,
      url: String(fields.get("url") || "").trim(),
      price: Number(fields.get("price")),
      appeal: String(fields.get("appeal")).trim(),
      analysis: "등록한 상품의 사진과 가격만으로 품질을 판단하기는 어려워요.\n구매 전 실제 사양과 후기를 함께 확인해 보세요.\n지금 꼭 필요한 상품인지 생각해 보는 것도 좋아요.",
    });
  }

  return (
    <form className="product-form" onSubmit={submit}>
      <h2 id="add-product-title">{method === "link" ? "링크로 추가하기" : "이미지로 추가하기"}</h2>
      <p className="description">상품 이름과 가격은 직접 입력해 주세요.</p>
      {method === "link" ? (
        <>
          <label htmlFor="new-product-url">상품 링크</label>
          <input id="new-product-url" name="url" type="url" placeholder="https://..." pattern="https?://.+" title="http:// 또는 https://로 시작하는 상품 링크를 입력해 주세요." required />
        </>
      ) : (
        <>
          <label htmlFor="new-product-image">상품 이미지</label>
          <input id="new-product-image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={selectImage} />
          {uploadedImage && <img className="upload-preview" src={uploadedImage} alt="선택한 상품 이미지" width="80" height="80" />}
          {imageError && <p role="alert" className="form-image-error">{imageError}</p>}
        </>
      )}
      <fieldset className="product-image-options">
        <legend>샘플 사진 선택</legend>
        <div>
          {sampleProducts.map((product) => (
            <label key={product.id}>
              <input type="radio" name="image" value={product.id} checked={!uploadedImage && imageId === product.id} onChange={() => { setImageId(product.id); setUploadedImage(""); setImageError(""); }} />
              <img src={product.image} alt={product.title} width="80" height="80" />
            </label>
          ))}
        </div>
      </fieldset>
      <label htmlFor="new-product-title">상품 이름</label>
      <input id="new-product-title" name="title" placeholder="예: 갖고 싶은 맥북" maxLength={80} required />
      <label htmlFor="new-product-price">가격 (원)</label>
      <input id="new-product-price" name="price" type="number" min="0" max="999999999" step="1" placeholder="1290000" required />
      <label htmlFor="new-product-appeal">이 상품의 매력을 한 줄로 어필해주세요!</label>
      <input id="new-product-appeal" name="appeal" placeholder="가볍고 색이 예뻐서 매일 쓰고 싶어요" maxLength={120} />
      <button type="submit" className="primary">위시리스트에 담기</button>
    </form>
  );
}
