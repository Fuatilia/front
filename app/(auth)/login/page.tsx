import Link from "next/link";
import LoginForm from "../../components/auth/LoginForm";

export default function index() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-800">
        Log into your user account
      </h2>
      <div className={'w-full flex items-center justify-center mt-6'}>
        <LoginForm />
      </div>
      <p className='mt-4 text-sm'>No account? <Link href="/signup"><span className='text-[#2cbc63] underline'>Sign Up</span> </Link></p>
    </div>
  );
}
