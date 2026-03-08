"use client";

import { API_ROUTES } from "@/constants/global.const";
import { postData } from "@/helper/helper";
import { loginSchema } from "@/validations/auth.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError(fieldErrors);
      return;
    }

    try {
      const res = await postData(API_ROUTES.LOGIN_API, result?.data);
      if (res?.error) {
        setServerError(res.error || "something went wrong");
        console.error("Login error:", res.error);
        return;
      }
      if (res?.success) {
        setSuccessMessage(res?.message || "Login Successfull");
        setForm({
          name: "",
          email: "",
          password: "",
        });
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Signing in…" : "Login"}
      </button>
    </form>
  );
}
