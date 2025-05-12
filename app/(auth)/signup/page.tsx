import Link from "next/link";
import SignupForm from "../../components/auth/SignupForm";

export default function index() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-800">
        Create your user account
      </h2>
      <div className={'w-full flex items-center justify-center mt-6'}>
        <SignupForm />
      </div>
      <p className='mt-4 text-sm'>Already have an account? <Link href="/login"><span className='text-[#2cbc63] underline'>Login</span> </Link></p>
    </div>
  );
}
