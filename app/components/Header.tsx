"use client";

import Image from "next/image";
import Link from "next/link";
import '../page.css'
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter()
  return (
    <header className="header">
        <div></div>
        <nav onClick={() => router.push('/')} className="nav-bar cursor-pointer">
          <Image
            src="/fuatilia-logo.webp"
            alt="fuatilia"
            width={80}
            height={80}
          />
          <p>Keeping the MPs accountable</p>
        </nav>
        <div className='flex'>
          <Link href='/signup' className="w-[100px] h-[40px] flex items-center justify-center bg-slate-100 rounded-xl mr-2">Sign Up</Link>
          <Link href='/bills' className="w-[100px] h-[40px] flex items-center justify-center bg-slate-100 rounded-xl">Bills</Link>
        </div>
    </header>
  );
};

export default Header;
