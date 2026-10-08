import IconifyIcon from "./IconifyIcon";
import Modal from "./Modal";

export default function AddProductOptions({ onSelect, onClose }) {
  return (
    <Modal titleId="add-method-title" className="add-method-modal" showClose={false} onClose={onClose}>
      <h2 id="add-method-title" className="sr-only">상품 추가 방법</h2>
      <div className="add-method-options">
        <button type="button" onClick={() => onSelect("link")} autoFocus>
          <IconifyIcon name="link" size={20} />
          <span>링크로 추가하기</span>
        </button>
        <button type="button" onClick={() => onSelect("image")}>
          <IconifyIcon name="image" size={20} />
          <span>이미지로 추가하기</span>
        </button>
      </div>
    </Modal>
  );
}
