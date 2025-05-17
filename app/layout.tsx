import "./global.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


const metadata = {
  title: "Dashboard",
  description: "Dashboard",
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
