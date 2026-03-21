"use client";

import ErrorComp from "@/components/Shared/ErrorComp";
import LoaderComp from "@/components/Shared/LoaderComp";
import { getData } from "@/helper/helper";
import { Editor } from "@monaco-editor/react";
import React, { useEffect, useMemo, useState } from "react";

const difficultyStyles = {
  easy: "border border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border border-amber-200 bg-amber-50 text-amber-700",
  hard: "border border-rose-200 bg-rose-50 text-rose-700",
};

const languageOptions = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "cpp", label: "C++" },
];

const fallbackStarterCode = {
  javascript: "function twoSum(nums, target) {\n  \n}",
  python: "def twoSum(nums, target):\n    pass",
  cpp: "#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    \n}",
};

function InfoSection({ title, children }) {
  return (
    <section className="mb-6">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-foreground-soft">
        {title}
      </h3>
      {children}
    </section>
  );
}

function EmptyBlock({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-background-muted px-4 py-5 text-sm text-foreground-soft">
      {message}
    </div>
  );
}

function PrblmDetailComp({ id }) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(fallbackStarterCode.python);
  const [serverError, setServerError] = useState("");

  async function fetchProblem() {
    try {
      setLoading(true);
      setServerError("");

      const res = await getData(`/api/problem/${id}`, {
        cache: "no-store",
      });

      if (res?.error) {
        setServerError(res.error || "Unable to load this problem right now.");
        return;
      }

      const nextProblem = res || {};
      const starterCode = nextProblem?.starterCode || fallbackStarterCode;

      setProblem(nextProblem);
      setCode(starterCode[language] || fallbackStarterCode[language]);
    } catch (error) {
      setServerError(
        error?.message || "Unable to load this problem right now.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProblem();
  }, [id]);

  const difficultyClass = useMemo(() => {
    const key = problem?.difficulty?.toLowerCase();
    return (
      difficultyStyles[key] ||
      "border border-border bg-background-muted text-foreground"
    );
  }, [problem?.difficulty]);

  useEffect(() => {
    if (!problem) return;

    const starterCode = problem?.starterCode || fallbackStarterCode;
    setCode(starterCode[language] || fallbackStarterCode[language]);
  }, [language, problem]);

  if (loading) {
    return (
      <LoaderComp
        title="Opening problem workspace"
        message="Fetching the statement, examples, constraints, and starter code."
      />
    );
  }

  if (serverError) {
    return (
      <ErrorComp
        title="We could not open this problem"
        message={serverError}
        actionLabel="Reload Problem"
        onAction={fetchProblem}
      />
    );
  }

  return (
    <div className="flex  h-[90vh] gap-6 p-4 text-foreground ">
      <div className="w-[60%] overflow-y-auto">
        <div className="relative overflow-hidden rounded-4xl border border-border-strong  p-6  sm:p-8 lg:p-10">
          <div className="absolute inset-0 " />
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
                Code Judge Problem
              </span>
              {problem?.difficulty ? (
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${difficultyClass}`}
                >
                  {problem.difficulty}
                </span>
              ) : null}
            </div>

            <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {problem?.title || "Untitled Problem"}
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-foreground-soft sm:text-base">
              {problem?.description ||
                problem?.statement ||
                "No overview is available for this problem yet."}
            </p>

            <InfoSection title="Statement">
              {problem?.statement ? (
                <p className="whitespace-pre-wrap text-sm leading-7 text-foreground-soft">
                  {problem.statement}
                </p>
              ) : (
                <EmptyBlock message="Problem statement is not available." />
              )}
            </InfoSection>

            {problem?.tags?.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {problem.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full border border-border bg-white/80 px-3 py-1.5 text-sm text-foreground-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="grid gap-6 xl:grid-cols-2">
              <InfoSection title="Input Format">
                {problem?.inputFormat ? (
                  <p className="whitespace-pre-wrap text-sm leading-7 text-foreground-soft">
                    {problem.inputFormat}
                  </p>
                ) : (
                  <EmptyBlock message="Input format is not available." />
                )}
              </InfoSection>

              <InfoSection title="Output Format">
                {problem?.outputFormat ? (
                  <p className="whitespace-pre-wrap text-sm leading-7 text-foreground-soft">
                    {problem.outputFormat}
                  </p>
                ) : (
                  <EmptyBlock message="Output format is not available." />
                )}
              </InfoSection>
            </div>

            <InfoSection title="Sample Cases">
              {problem?.samples?.length > 0 ? (
                <div className="space-y-4">
                  {problem.samples.map((sample, index) => (
                    <div
                      key={`sample-${index}`}
                      className="rounded-2xl border border-border bg-background-muted/60 p-5"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h4 className="text-base font-semibold text-foreground">
                          Sample {index + 1}
                        </h4>
                        <span className="text-xs uppercase tracking-[0.2em] text-foreground-soft">
                          Test Preview
                        </span>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-soft">
                            Input
                          </p>
                          <pre className="overflow-x-auto rounded-2xl border border-sky-100 bg-white p-4 text-sm text-sky-800">
                            {sample?.input || "No input provided"}
                          </pre>
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-soft">
                            Output
                          </p>
                          <pre className="overflow-x-auto rounded-2xl border border-emerald-100 bg-white p-4 text-sm text-emerald-800">
                            {sample?.output || "No output provided"}
                          </pre>
                        </div>
                      </div>

                      {sample?.explanation ? (
                        <div className="mt-4 rounded-2xl border border-border bg-white/70 p-4">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-soft">
                            Explanation
                          </p>
                          <p className="whitespace-pre-wrap text-sm leading-7 text-foreground-soft">
                            {sample.explanation}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyBlock message="Sample cases have not been added for this problem yet." />
              )}
            </InfoSection>
            <InfoSection title="Constraints">
              {problem?.constraints?.length > 0 ? (
                <ul className="space-y-3">
                  {problem.constraints.map((constraint, index) => (
                    <li
                      key={`constraint-${index}`}
                      className="rounded-2xl border border-border bg-background-muted/60 px-4 py-3 text-sm leading-7 text-foreground-soft"
                    >
                      {constraint}
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyBlock message="Constraints are not available for this problem." />
              )}
            </InfoSection>
          </div>
        </div>
      </div>
      <div className="h-[80vh] flex-1  rounded-4xl border border-slate-200 bg-slate-950 p-4 ">
        <div className="mb-4 flex  items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Write your Code here
            </p>
            <h2 className="text-lg font-semibold text-white">Editor</h2>
          </div>

          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Editor
          height={500}
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

export default PrblmDetailComp;
