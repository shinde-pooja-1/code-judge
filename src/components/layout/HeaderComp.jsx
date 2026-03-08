import Link from "next/link";
import React from "react";

function HeaderComp() {
  return (
    <div>
      <div className="flex gap-6 justify-end px-10 py-6">
        <Link href="/signup" className="hover:text-violet-600">
          Sign up
        </Link>
        or
        <Link href="/login" className="hover:text-violet-600">
          Login
        </Link>
      </div>
    </div>
  );
}

export default HeaderComp;
