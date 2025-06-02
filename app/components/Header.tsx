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
    <header className="w-full px-4 py-4 shadow-md bg-white">
      <div className="w-full mx-auto flex items-center justify-between">
        <div className={'hidden lg:block'}></div>
        <div
          onClick={() => router.push("/")}
          className="flex items-center cursor-pointer"
        >
          <Image
            src="/fuatilia-logo.webp"
            alt="fuatilia"
            width={50}
            height={50}
          />
          <p className="h-[20px] text-sm hidden text-[#2cbc63] font-bold md:block">
            Keeping the MPs accountable
          </p>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <CgMenuRightAlt size={24} />
            ) : (
              <HiOutlineMenuAlt1 size={24} />
            )}
          </button>
        </div>

        <div
          className={`flex flex-col lg:flex-row lg:items-center gap-2 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white px-4 py-2 lg:p-0 transition-all duration-300 shadow-md lg:shadow-none ${
            menuOpen ? "flex" : "hidden lg:flex"
          }`}
        >
          <Link
            href="/bills"
            className="w-full lg:w-[100px] h-[40px] flex items-center justify-center bg-slate-100 rounded-xl lg:mr-2"
          >
            Bills
          </Link>
          <Link
            href="/reps"
            className="w-full lg:w-[100px] h-[40px] flex items-center justify-center bg-slate-100 rounded-xl lg:mr-2"
          >
            Reps
          </Link>
          <Link
            href="/signup"
            className="w-full lg:w-[100px] h-[40px] flex items-center justify-center bg-slate-100 rounded-xl"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
