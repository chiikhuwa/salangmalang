export default function WishlistItem({ product, onSelect }) {
  return (
    <button
      type="button"
      className="wishlist-item"
      style={{ backgroundColor: product.background }}
      onClick={() => onSelect(product)}
      aria-label={`${product.title} 상세 보기`}
      aria-haspopup="dialog"
    >
      <img src={product.image} alt="" className="item-image" width="160" height="160" />
    </button>
  );
}
