"use client";

import { API_ROUTES } from "@/constants/global.const";
import { postData } from "@/helper/helper";
import { signupSchema } from "@/validations/auth.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      setLoading(true);

      const res = await postData(API_ROUTES.SIGN_UP_API, result?.data);

      if (res?.error) {
        setServerError(res.error || "something went wrong");
        return;
      }
      if (res?.success) {
        setSuccessMessage(res?.message || "Signup Successfull");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <p className="font-bold text-2xl text-center">loading......</p>;

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
