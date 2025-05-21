import { Inter } from "next/font/google";
import { Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import "./page.css";
import Header from "./components/Header";
import ReactQueryProvider from "./providers/QueryProvider";

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
  title: "Keeping the MPs Accountable!",
  description:
    "Keeping the mps accountable for their actions in proposed bills in parliament",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${redHatMono.variable} flex flex-col h-[100vh] justify-between`}
      >
        <ReactQueryProvider>
          <Header />
          {children}
          <footer className="footer-content">
            <small>
              &copy; {new Date().getFullYear()} Fuatilia All Rights Reserved.
            </small>
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
