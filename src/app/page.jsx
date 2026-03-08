import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Code Judge</h1>
      <p className="text-gray-500 text-base mb-8 text-center max-w-sm">
        Write, run, and evaluate code challenges in one place.
      </p>
      <div className="flex gap-3">
        <Link
          href="/signup"
          className="px-5 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition"
        >
          Get started
        </Link>
        <Link
          href="/login"
          className="px-5 py-2 border border-gray-300 text-black rounded-md text-sm hover:bg-gray-50 transition"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}
