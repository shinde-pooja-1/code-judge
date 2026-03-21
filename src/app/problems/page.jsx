"use client";
import ErrorComp from "@/components/Shared/ErrorComp";
import LoaderComp from "@/components/Shared/LoaderComp";
import ProblemComp from "@/components/Problems/ProblemComp";
import { API_ROUTES } from "@/constants/global.const";
import { getData } from "@/helper/helper";
import React, { useEffect, useState } from "react";

function ProblemsPage() {
  const [serverError, setServerError] = useState("");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProblems() {
    try {
      setLoading(true);
      setServerError("");
      const res = await getData(API_ROUTES.PROBLEMS_API);
      if (res?.error) {
        setServerError(res.error || "something went wrong");
        console.error("Problems list error:", res.error);
        return;
      }
      console.log("res:", res);

      setProblems(res || []);
    } catch (error) {
      setServerError(error || "something went wrong");
      console.error("Problems list error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading) {
    return (
      <LoaderComp
        title="Loading problem library"
        message="Gathering every challenge, tag, and difficulty level for the list view."
      />
    );
  }

  if (serverError) {
    return (
      <ErrorComp
        title="Problem list unavailable"
        message={serverError}
        actionLabel="Try Again"
        onAction={fetchProblems}
      />
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="space-y-4">
          {problems?.length > 0 ? (
            problems.map((problem) => (
              <ProblemComp problem={problem} key={problem._id} />
            ))
          ) : (
            <div className="rounded-4xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center ">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                No Problems Yet
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                The problem list is empty.
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Add your first coding challenge from the admin area and it will
                appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
