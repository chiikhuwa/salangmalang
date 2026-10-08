import "./globals.css";

export const metadata = {
  title: "살랑말랑",
  description: "",
  icons: { icon: "/favicon.ico" },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="ko"><body>{children}</body></html>;
}
