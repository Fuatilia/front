"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CgMenuRightAlt } from "react-icons/cg";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div></div>
        <div
          onClick={() => router.push("/")}
          className="logo-link"
        >
          <Image
            src="/fuatilia-logo.webp"
            alt="fuatilia"
            width={50}
            height={50}
          />
          <p className="logo-text">
            Keeping the MPs accountable
          </p>
        </div>

        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-button"
          >
            {menuOpen ? (
              <CgMenuRightAlt size={28} />
            ) : (
              <HiOutlineMenuAlt1 size={28} />
            )}
          </button>
        </div>

        <div
          className={`nav-menu ${menuOpen ? "nav-menu-open" : ""}`}
        >
          <Link
            href="/bills"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Bills
          </Link>
          <Link
            href="/reps"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Reps
          </Link>
          <Link
            href="/aspirants"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Aspirants
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
