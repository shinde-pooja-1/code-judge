import AdminProblemForm from "@/components/admin/AdminProblemForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminProblemCreatePage() {
  // const user = await getCurrentUser();

  // if (!user?.isAdmin) {
  //   redirect("/dashboard");
  // }

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-4xl border border-slate-200 p-8 ">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Add a new coding problem
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Create a problem record with statement content, visible samples,
            hidden tests, tags, and starter code for JavaScript, Python, and
            C++.
          </p>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-slate-50/80 p-6  sm:p-8">
          <AdminProblemForm />
        </div>
      </div>
    </main>
  );
}
