"use client";

import { useEffect, useRef } from "react";
import IconifyIcon from "./IconifyIcon";

export default function Modal({ titleId, onClose, children, className = "" }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={`product-modal ${className}`}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
    >
      <button type="button" className="modal-close" aria-label="모달 닫기" onClick={onClose} autoFocus>
        <IconifyIcon name="close" size={20} />
      </button>
      {children}
    </dialog>
  );
}
