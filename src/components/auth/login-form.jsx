"use client"

import { useState } from "react"

// Client component — handles form state and submission
export default function LoginForm() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Login failed")

            // TODO: store token (e.g. in a cookie via middleware) and redirect
            console.log("Token:", data.token)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
            </button>
        </form>
    )
}
