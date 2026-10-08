export function PlaceholderLogoIcon({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="살랑말랑 임시 로고">
      <rect width="64" height="64" rx="22" fill="#eaf4ed" />
      <path d="M32 47 17 33c-9-9 4-23 15-11 11-12 24 2 15 11Z" fill="#1b7145" />
      <circle cx="26" cy="30" r="2" fill="white" />
      <circle cx="38" cy="30" r="2" fill="white" />
      <path d="M27 36c3 3 7 3 10 0" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ShoppingCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M19 8V2H6v6h11zM5 13h14v7H6v-7zM19 17V12h-6v5h6z"/>
    </svg>
  );
}

export function CircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/>
    </svg>
  );
}
