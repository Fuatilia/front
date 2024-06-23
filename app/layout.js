import { Inter } from "next/font/google";
import { Red_Hat_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const redHatMono = Red_Hat_Mono({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-red-hat-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Keeping the mpigs Accountable!",
  description:
    "Keeping the mpigs Accountable for their actions in proposed bills in parliament",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${redHatMono.variable}`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
