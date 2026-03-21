import React from "react";

function LoaderComp({
  title = "Loading problems",
  message = "Preparing the next coding challenge for you.",
  compact = false,
}) {
  return (
    <div
      className={`${
        compact ? "min-h-70" : "min-h-[70vh]"
      } flex items-center justify-center px-4 py-10 sm:px-6`}
    >
      <div className="w-full max-w-xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-200 bg-white">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-blue-600">
          Code Judge
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-gray-900">{title}</h2>

        <p className="mx-auto mt-3 max-w-md text-sm text-gray-600">{message}</p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-2 rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoaderComp;
