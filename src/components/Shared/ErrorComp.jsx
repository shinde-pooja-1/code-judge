import React from "react";

function ErrorComp({
  title = "Something went wrong",
  message = "We couldn't load this section right now.",
  actionLabel,
  onAction,
  compact = false,
}) {
  return (
    <div
      className={`${
        compact ? "min-h-70" : "min-h-[70vh]"
      } flex items-center justify-center px-4 py-10 sm:px-6`}
    >
      <div className="w-full max-w-2xl rounded-4xl border border-rose-200 bg-rose-50 ">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-rose-200 bg-white text-3xl text-rose-500 ">
          !
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-rose-600">
          Problems State
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-rose-700">
          {message}
        </p>

        {actionLabel && onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="mt-8 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ErrorComp;
