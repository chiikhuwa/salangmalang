"use client";

import { useState } from "react";
import { sampleProducts } from "../lib/sampleProducts";

export default function ProductForm({ onSubmit }) {
  const [imageId, setImageId] = useState(sampleProducts[0].id);

  function submit(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const title = String(fields.get("title")).trim();
    if (!title) return;
    const sample = sampleProducts.find((product) => product.id === imageId);
    onSubmit({
      ...sample,
      id: crypto.randomUUID(),
      title,
      price: Number(fields.get("price")),
      appeal: String(fields.get("appeal")).trim(),
      analysis: "등록한 상품의 사진과 가격만으로 품질을 판단하기는 어려워요.\n구매 전 실제 사양과 후기를 함께 확인해 보세요.\n지금 꼭 필요한 상품인지 생각해 보는 것도 좋아요.",
    });
  }

  return (
    <form className="product-form" onSubmit={submit}>
      <h2 id="add-product-title">상품 추가</h2>
      <p className="description">갖고 싶은 상품을 위시리스트에 담아보세요.</p>
      <fieldset className="product-image-options">
        <legend>샘플 사진 선택</legend>
        <div>
          {sampleProducts.map((product) => (
            <label key={product.id}>
              <input type="radio" name="image" value={product.id} checked={imageId === product.id} onChange={() => setImageId(product.id)} />
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
