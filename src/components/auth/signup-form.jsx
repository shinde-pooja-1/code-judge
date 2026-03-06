"use client";

import { useState } from "react";
import { signupSchema } from "@/validations/auth.schema";
import { postData } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { SIGN_UP_API } from "@/constants/global.const";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    setSuccessMessage("");

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const res = await postData("/api/auth/signup", result?.data);

      if (res?.error) {
        setServerError(res.error || "something went wrong");
        return;
      }
      if (res?.success) setSuccessMessage(res?.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      router.push("/");
    } catch (error) {
      setServerError("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white text-black p-8"
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password[0]}</p>
        )}
      </div>

      {serverError && <p className="text-red-600 text-sm">{serverError}</p>}
      {successMessage && (
        <p className="text-green-600 text-sm">{successMessage}</p>
      )}

      <button type="submit" className="bg-black text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
