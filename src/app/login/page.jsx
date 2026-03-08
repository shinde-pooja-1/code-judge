import LoginForm from "@/components/auth/login-form";

export const metadata = {
  title: "Login | CodeJudge",
  description: "Sign in to your CodeJudge account",
};

export default function LoginPage() {
  return (
    <div className="max-w-md w-full mx-auto p-8 rounded border">
      <h1 className="text-center text-xl mb-3 font-bold">Welcome Back</h1>
      <LoginForm />
    </div>
  );
}
