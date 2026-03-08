import SignupForm from "@/components/auth/signup-form";
import Link from "next/link";

export const metadata = {
  title: "Sign Up | CodeJudge",
  description: "Create your CodeJudge account",
};

export default function SignupPage() {
  return (
    <div className="max-w-md w-full mx-auto p-8 rounded border">
      <h1 className="text-center text-xl mb-3 font-bold">Create an Account</h1>
      <SignupForm />
      <div className="flex gap-2 items-center mt-2 justify-center">
        {" "}
        <p>Already have an account?</p>
        <Link href="/login" className="text-blue-700 hover:text-blue-500">
          Log in
        </Link>
      </div>
    </div>
  );
}
