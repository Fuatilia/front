"use client";
import Image from "next/image";

import { StackedCarousel } from "./components";

import "./page.css";

const images = [
  "/fake-mp.jpeg",
  "/occupy-parliament.jpeg",
  "/reject-not-amend.jpeg",
  "/reject.jpeg",
  "/rex-img.jpeg",
  "/sadaka.jpeg",
  "/seven-days-of-rage.jpeg",
];

const Home = () => {
  return (
    <div className="root">
      <header className="header">
        <nav className="nav-bar">
          <Image
            src="/fuatilia-logo.webp"
            alt="fuatilia"
            width={80}
            height={80}
          />
          <p>Keeping the MPIGS accountable</p>
        </nav>
      </header>
      <main className="main">
        <section className="hero-section">
          <div className="hero">
            <h2>
              Reject finance bill 2024, keep the MPIGS accountable, say no to
              impunity and injustice!
            </h2>
            <p>
              How did your MP vote for the 2024 fianance bill? Are you happy?{" "}
              Track all proposed bills, who proposed them and how each MP voted
              for the bill.
            </p>
          </div>
          <StackedCarousel images={images} />
        </section>
      </main>
      <footer className="footer-content">
        <small>
          &copy; {new Date().getFullYear()} Fuatilia All Rights Reserved.
        </small>
      </footer>
    </div>
  );
};

export default Home;
