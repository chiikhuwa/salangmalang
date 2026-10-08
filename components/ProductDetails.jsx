import { formatPrice, productTags } from "../lib/sampleProducts";
import Modal from "./Modal";

export default function ProductDetails({ product, onClose }) {
  return (
    <Modal titleId="product-title" className="product-detail-modal" onClose={onClose}>
      <div className="product-modal-image" style={{ backgroundColor: product.background }}>
        <img src={product.image} alt={product.title} width="800" height="800" />
      </div>
      <div className="product-modal-body">
        <h2 id="product-title">{product.title}</h2>
        <p className="product-price">{formatPrice(product.price)}</p>
        <p className="product-prompt">이 상품의 매력을 한 줄로 어필해주세요!</p>
        {product.appeal && <p className="product-appeal">{product.appeal}</p>}
        <div className="product-tags" aria-label="상품 매력">
          {(product.tags ?? productTags).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <section className="product-ai" aria-labelledby="product-ai-title">
          <h3 id="product-ai-title">AI는 이렇게 말했어요</h3>
          <p>{product.analysis}</p>
        </section>
      </div>
    </Modal>
  );
}
