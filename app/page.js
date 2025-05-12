"use client";
import Image from "next/image";

import { StackedCarousel } from "./components";

import "./page.css";
import Link from "next/link";

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
      <main className="main">
        <section className="hero-section">
          <div className="hero">
            <h2>
              Keep the your representatives accountable, say no to
              impunity and injustice!
            </h2>
            <p>
              How did your MP/Senator represent you? Are you happy?{" "}
              Track all proposed bills, who proposed them and how each MP voted
              for the bill.
            </p>
          </div>
          <StackedCarousel images={images} />
        </section>
      </main>
    </div>
  );
};

export default Home;
