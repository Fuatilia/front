"use client" 

import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { LuEyeClosed } from 'react-icons/lu';

type TPassword = {
    password: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Password = ({password, handleChange}: TPassword) => {
    const [seePassword, setSeePassword] = useState(false);

  function togglePassword(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setSeePassword(!seePassword);
  }
  return (
    <div className="w-full lg:w-[600px]">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className={"flex"}>
          <input
            id="password"
            name="password"
            type={seePassword ? "text" : "password"}
            required
            className={
              "w-[80%] lg:w-[500px]  h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-l-2xl  outline-none mb-3"
            }
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button
            className={
              "w-[20%] lg:w-[100px] h-[40px] flex items-center justify-center bg-transparent border border-slate-300 rounded-r-2xl outline-none mb-3 cursor-pointer"
            }
            onClick={(e) => togglePassword(e)}
          >
            {seePassword ? <LuEyeClosed /> : <FaEye />}
          </button>
        </div>
      </div>
  )
}

export default Password