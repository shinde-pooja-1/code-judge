import Link from "next/link";

const HrederComp = ({ user }) => {
    return (
        <header className="flex justify-between items-center px-8 py-4 border-b border-gray-100 bg-white">
            {/* Logo */}
            <Link href="/" className="text-sm font-semibold tracking-tight text-black">
                Code Judge
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-4">
                {user ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="text-sm text-gray-600 hover:text-black transition"
                        >
                            Dashboard
                        </Link>
                        <span className="text-sm text-gray-400">|</span>
                        <span className="text-sm text-gray-700">{user.name}</span>
                        <button className="text-sm px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition cursor-pointer">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm text-gray-600 hover:text-black transition"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm px-4 py-1.5 bg-black text-white rounded-md hover:bg-gray-800 transition"
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