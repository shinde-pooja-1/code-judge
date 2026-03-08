import SignupForm from "@/components/auth/signup-form";

export const metadata = {
  title: "Sign Up | CodeJudge",
  description: "Create your CodeJudge account",
};

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-center text-xl">Create an Account</h1>
      <SignupForm />
    </div>
  );
}
