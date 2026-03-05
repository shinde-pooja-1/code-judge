import LoginForm from "@/components/auth/login-form"

export const metadata = {
    title: "Login | CodeJudge",
    description: "Sign in to your CodeJudge account",
}

export default function LoginPage() {
    return (
        <div>
            <h1>Welcome Back</h1>
            <LoginForm />
        </div>
    )
}
