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
    <div className="password-wrapper">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="password-input-wrapper">
          <input
            id="password"
            name="password"
            type={seePassword ? "text" : "password"}
            required
            className="password-input"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <button
            className="password-toggle"
            onClick={(e) => togglePassword(e)}
          >
            {seePassword ? <LuEyeClosed /> : <FaEye />}
          </button>
        </div>
      </div>
  )
}

export default Password
