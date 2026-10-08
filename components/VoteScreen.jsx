"use client";

import { useState } from "react";
import { formatPrice, productTags } from "../lib/sampleProducts";

function VoteCard({ product }) {
  return (
    <article className="vote-card">
      <img className="vote-thumbnail" src={product.image} alt={product.title} width="800" height="800" />
      <div className="vote-card-info">
        <h2>{product.title}</h2>
        <p className="vote-price">{formatPrice(product.price)}</p>
        <div className="vote-tags">
          {(product.tags ?? productTags).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}

export default function VoteScreen({ product, nextProduct }) {
  const [choice, setChoice] = useState(null);

  return (
    <div className="vote-screen" role="tabpanel" id="collection-panel-vote" aria-labelledby="collection-tab-vote">
      <div className="vote-stack">
        <h1 className="vote-title">이 물건, <span className="salang-color">살랑가</span> <span className="malang-color">말랑가</span>?</h1>
        <VoteCard product={product} />
        <div className="vote-actions" role="group" aria-label="상품 의견">
          <button type="button" className="vote-salang" aria-pressed={choice === "salang"} onClick={() => setChoice(choice === "salang" ? null : "salang")}>살랑</button>
          <button type="button" className="vote-malang" aria-pressed={choice === "malang"} onClick={() => setChoice(choice === "malang" ? null : "malang")}>말랑</button>
        </div>
        <div className="vote-next" aria-hidden="true">
          <VoteCard product={nextProduct} />
        </div>
      </div>
    </div>
  );
}
