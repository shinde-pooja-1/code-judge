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
  const [showPassword, setShowPassword] = useState(false);

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
      setLoading(false);
      return;
    }

    try {
      const res = await postData(API_ROUTES.LOGIN_API, result?.data);
      if (res?.error) {
        setError(res.error || "something went wrong");
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
        router.refresh();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4  bg-white text-black"
    >
      <input
        name="email"
        type="email"
        placeholder="Enter Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      {error?.email && <p style={{ color: "red" }}>{error?.email[0]}</p>}
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        {error?.password && (
          <p style={{ color: "red" }}>{error?.password[0]}</p>
        )}
      </div>
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}

      <button
        type="submit"
        className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800  transition"
      >
        {loading ? "Login..." : "Login"}
      </button>
    </form>
  );
}
