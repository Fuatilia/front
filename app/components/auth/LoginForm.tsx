"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Password from "../common/Password";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/v1/login/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      } else {
        const token = data.access;
        localStorage.setItem("accessToken", token);
      }

      router.push("/bills");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className={
            "w-[600px] h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-2xl  outline-none mb-3"
          }
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <Password password={formData?.password} handleChange={handleChange} />

      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          disabled={loading}
          className={
            "w-[200px] h-[40px] text-white bg-[#2cbc63] rounded-2xl  outline-none mt-6 cursor-pointer"
          }
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </div>
    </form>
  );
}
