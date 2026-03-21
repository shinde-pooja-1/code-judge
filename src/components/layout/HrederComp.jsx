import Link from "next/link";

const HrederComp = ({ user }) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-8 py-4">
      <Link href="/" className="text-sm font-semibold tracking-tight text-black">
        Code Judge
      </Link>

      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 transition hover:text-black"
            >
              Dashboard
            </Link>
            <Link
              href="/problems"
              className="text-sm text-gray-600 transition hover:text-black"
            >
              Problems
            </Link>
            {user.isAdmin ? (
              <Link
                href="/admin/problems/new"
                className="rounded-md bg-black px-4 py-1.5 text-sm text-white transition hover:bg-gray-800"
              >
                Add Problem
              </Link>
            ) : null}
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-700">{user.name}</span>
            <button className="cursor-pointer rounded-md border border-gray-300 px-4 py-1.5 text-sm transition hover:bg-gray-50">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm text-gray-600 transition hover:text-black"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-black px-4 py-1.5 text-sm text-white transition hover:bg-gray-800"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default HrederComp;
