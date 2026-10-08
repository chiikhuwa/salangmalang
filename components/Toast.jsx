export default function Toast({ state }) {
  if (!state) return null;

  return (
    <div className="mock-toast" role="status" aria-live="polite" aria-atomic="true">
      {state === "analyzing" && <span className="toast-spinner" aria-hidden="true" />}
      <span>{state === "analyzing" ? "OCR로 분석 중이에요" : "제품 추가 완료!"}</span>
    </div>
  );
}
