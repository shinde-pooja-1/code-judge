import Link from "next/link";
import React from "react";

function ProblemComp({ problem }) {
  console.log("problem:", problem);

  return (
    <Link
      href={`/problem/${problem._id}/`}
      className="bg-gray-100 text-gray-900 rounded-xl p-3 w-full"
    >
      <div className="flex justify-between gap-2 flex-wrap">
        <h2 className="text-xl font-semibold">{problem?.title}</h2>
        <p className="text-sm rounded-full px-3 py-0.5 bg-green-600 text-white">
          {problem?.difficulty}
        </p>
      </div>
      <p className="text-md line-clamp-1">{problem?.statement}</p>
    </Link>
  );
}

export default ProblemComp;
