"use client";

import { API_ROUTES } from "@/constants/global.const";
import { postData } from "@/helper/helper";
import { problemSchema } from "@/validations/problem.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

const defaultStarterCode = {
  javascript: "function twoSum(nums, target) {\n  \n}",
  python: "def twoSum(nums, target):\n    pass",
  cpp: "#include <vector>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    \n}",
};

const createSample = () => ({
  input: "",
  output: "",
  explanation: "",
});

const createHiddenTest = () => ({
  input: "",
  output: "",
});

function createInitialForm() {
  return {
    title: "",
    slug: "",
    difficulty: "easy",
    description: "",
    statement: "",
    inputFormat: "",
    outputFormat: "",
    constraintsText: "",
    tagsText: "",
    samples: [createSample()],
    hiddenTests: [createHiddenTest()],
    starterCode: { ...defaultStarterCode },
  };
}

function Field({ label, children, hint }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </label>
  );
}

function buildPayload(form) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim().toLowerCase(),
    difficulty: form.difficulty,
    description: form.description.trim(),
    statement: form.statement.trim(),
    inputFormat: form.inputFormat.trim(),
    outputFormat: form.outputFormat.trim(),
    constraints: form.constraintsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    samples: form.samples.map((sample) => ({
      input: sample.input.trim(),
      output: sample.output.trim(),
      explanation: sample.explanation.trim(),
    })),
    hiddenTests: form.hiddenTests.map((test) => ({
      input: test.input.trim(),
      output: test.output.trim(),
    })),
    tags: form.tagsText
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean),
    starterCode: {
      javascript: form.starterCode.javascript,
      python: form.starterCode.python,
      cpp: form.starterCode.cpp,
    },
  };
}

export default function AdminProblemForm() {
  const router = useRouter();
  const [form, setForm] = useState(createInitialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleStarterCodeChange(language, value) {
    setForm((prev) => ({
      ...prev,
      starterCode: {
        ...prev.starterCode,
        [language]: value,
      },
    }));
  }

  function handleArrayChange(type, index, field, value) {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addArrayItem(type) {
    setForm((prev) => ({
      ...prev,
      [type]:
        type === "samples"
          ? [...prev.samples, createSample()]
          : [...prev.hiddenTests, createHiddenTest()],
    }));
  }

  function removeArrayItem(type, index) {
    setForm((prev) => {
      const nextItems = prev[type].filter((_, itemIndex) => itemIndex !== index);

      return {
        ...prev,
        [type]:
          nextItems.length > 0
            ? nextItems
            : type === "samples"
              ? [createSample()]
              : [createHiddenTest()],
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    setServerError("");
    setSuccessMessage("");

    const payload = buildPayload(form);
    const parsed = problemSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setLoading(false);
      return;
    }

    const response = await postData(API_ROUTES.ADMIN_PROBLEMS_API, parsed.data);

    if (response?.error) {
      setServerError(
        typeof response.error === "string"
          ? response.error
          : "Unable to create the problem",
      );
      setLoading(false);
      return;
    }

    setSuccessMessage(response?.message || "Problem created successfully");
    setForm(createInitialForm());
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Title">
          <input
            name="title"
            value={form.title}
            onChange={handleFieldChange}
            placeholder="Two Sum"
          />
        </Field>

        <Field
          label="Slug"
          hint="Use lowercase letters, numbers, and hyphens only."
        >
          <input
            name="slug"
            value={form.slug}
            onChange={handleFieldChange}
            placeholder="two-sum"
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Difficulty">
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleFieldChange}
            className="w-full px-4 py-3"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </Field>

        <Field label="Tags" hint="Separate tags with commas.">
          <input
            name="tagsText"
            value={form.tagsText}
            onChange={handleFieldChange}
            placeholder="array, hashmap"
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          name="description"
          value={form.description}
          onChange={handleFieldChange}
          rows={3}
          className="w-full px-4 py-3"
          placeholder="Short summary shown before the full statement."
        />
      </Field>

      <Field label="Statement">
        <textarea
          name="statement"
          value={form.statement}
          onChange={handleFieldChange}
          rows={8}
          className="w-full px-4 py-3"
          placeholder="Describe the full problem statement."
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Input Format">
          <textarea
            name="inputFormat"
            value={form.inputFormat}
            onChange={handleFieldChange}
            rows={5}
            className="w-full px-4 py-3"
          />
        </Field>

        <Field label="Output Format">
          <textarea
            name="outputFormat"
            value={form.outputFormat}
            onChange={handleFieldChange}
            rows={5}
            className="w-full px-4 py-3"
          />
        </Field>
      </div>

      <Field
        label="Constraints"
        hint="Use one line per constraint."
      >
        <textarea
          name="constraintsText"
          value={form.constraintsText}
          onChange={handleFieldChange}
          rows={5}
          className="w-full px-4 py-3"
          placeholder="1 <= n <= 10^5"
        />
      </Field>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Sample Test Cases
          </h2>
          <button
            type="button"
            onClick={() => addArrayItem("samples")}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Add Sample
          </button>
        </div>

        {form.samples.map((sample, index) => (
          <div
            key={`sample-${index}`}
            className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-900">Sample {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeArrayItem("samples", index)}
                className="text-sm text-rose-600"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Input">
                <textarea
                  value={sample.input}
                  onChange={(event) =>
                    handleArrayChange(
                      "samples",
                      index,
                      "input",
                      event.target.value,
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3"
                />
              </Field>

              <Field label="Output">
                <textarea
                  value={sample.output}
                  onChange={(event) =>
                    handleArrayChange(
                      "samples",
                      index,
                      "output",
                      event.target.value,
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3"
                />
              </Field>
            </div>

            <Field label="Explanation">
              <textarea
                value={sample.explanation}
                onChange={(event) =>
                  handleArrayChange(
                    "samples",
                    index,
                    "explanation",
                    event.target.value,
                  )
                }
                rows={3}
                className="w-full px-4 py-3"
              />
            </Field>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Hidden Tests</h2>
          <button
            type="button"
            onClick={() => addArrayItem("hiddenTests")}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Add Hidden Test
          </button>
        </div>

        {form.hiddenTests.map((test, index) => (
          <div
            key={`hidden-${index}`}
            className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-slate-900">
                Hidden Test {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeArrayItem("hiddenTests", index)}
                className="text-sm text-rose-600"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Input">
                <textarea
                  value={test.input}
                  onChange={(event) =>
                    handleArrayChange(
                      "hiddenTests",
                      index,
                      "input",
                      event.target.value,
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3"
                />
              </Field>

              <Field label="Output">
                <textarea
                  value={test.output}
                  onChange={(event) =>
                    handleArrayChange(
                      "hiddenTests",
                      index,
                      "output",
                      event.target.value,
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3"
                />
              </Field>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Starter Code</h2>

        <Field label="JavaScript">
          <textarea
            value={form.starterCode.javascript}
            onChange={(event) =>
              handleStarterCodeChange("javascript", event.target.value)
            }
            rows={8}
            className="w-full px-4 py-3 font-mono text-sm"
          />
        </Field>

        <Field label="Python">
          <textarea
            value={form.starterCode.python}
            onChange={(event) =>
              handleStarterCodeChange("python", event.target.value)
            }
            rows={8}
            className="w-full px-4 py-3 font-mono text-sm"
          />
        </Field>

        <Field label="C++">
          <textarea
            value={form.starterCode.cpp}
            onChange={(event) =>
              handleStarterCodeChange("cpp", event.target.value)
            }
            rows={8}
            className="w-full px-4 py-3 font-mono text-sm"
          />
        </Field>
      </section>

      {Object.keys(errors).length > 0 ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {Object.values(errors)
            .flat()
            .filter(Boolean)
            .join(", ")}
        </div>
      ) : null}

      {serverError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {serverError}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating Problem..." : "Create Problem"}
      </button>
    </form>
  );
}
