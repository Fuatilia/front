"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import Password from "../common/Password";

interface SignupFormData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: string;
  password: string;
  parent_organization: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone_number: "",
    password: "",
    parent_organization: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [successNotification, setSuccessNotification] = useState("")

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/v1/create/user`,
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
        throw new Error(
          data.error || "Something went wrong when signing up. Try again"
        );
      }else{
        setSuccessNotification('Successful! Verify your credentials from your email to proceed')
      }

    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during signup"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="w-full flex flex-col items-center justify-center px-4" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-3 ">
          {error}
        </div>
      )}
      {successNotification && (
        <div className="bg-green-100 border border-green-200 text-green-600 px-4 py-3 rounded-2xl mb-3 ">
          {successNotification}
        </div>
      )}
      <div className={"w-full lg:w-[600px] flex flex-col lg:flex-row"}>
        <div>
          <label htmlFor="first_name" className="sr-only">
            First Name
          </label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            required
            className={
              "w-full lg:w-[295px] lg:mr-[5px] h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-2xl outline-none mb-3"
            }
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name" className="sr-only">
            Last Name
          </label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            required
            className={
              "w-full lg:w-[295px] lg:ml-[5px] h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-2xl  outline-none mb-3"
            }
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="w-full lg:w-[600px]">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={
            "w-full h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-2xl  outline-none mb-3"
          }
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="w-full lg:w-[600px]">
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className={
            "w-full h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-2xl  outline-none mb-3"
          }
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="w-full lg:w-[600px]">
        <label htmlFor="phone_number" className="sr-only">
          Phone Number
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          required
          className={
            "w-full h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-2xl  outline-none mb-3"
          }
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
      <Password password={formData?.password} handleChange={handleChange} />
      <div className="w-full lg:w-[600px]">
        <label htmlFor="parent_organization" className="sr-only">
          Parent Organization
        </label>
        <input
          id="parent_organization"
          name="parent_organization"
          type="text"
          required
          className={
            "w-full h-[40px] pl-[1rem] bg-transparent border border-slate-300 rounded-2xl outline-none mb-3"
          }
          placeholder="LSK (if none, enter Fuatilia)"
          value={formData.parent_organization}
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          disabled={loading}
          className={
            "w-[200px] h-[40px] text-white bg-[#2cbc63] rounded-2xl  outline-none mt-6 cursor-pointer"
          }
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>
    </form>
  );
}
