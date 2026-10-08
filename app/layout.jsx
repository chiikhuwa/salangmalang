import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
  display: "swap",
});

export const metadata = {
  title: "살랑말랑",
  description: "",
  icons: { icon: "/favicon.ico" },
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return <html lang="ko" className={pretendard.variable}><body>{children}</body></html>;
}
