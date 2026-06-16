import Link from "next/link";

const institutionalRows = [
  { unit: "Faculties", count: "5", note: "Academic teaching structure" },
  { unit: "Departments", count: "26", note: "Program delivery units" },
  { unit: "Students", count: "5000+", note: "Projected active enrolment" },
  { unit: "Academic Sessions", count: "2", note: "Current and projected reporting cycles" },
];

const financialFlow = [
  { label: "Personnel", value: 38, amount: "38%" },
  { label: "Capital Projects", value: 27, amount: "27%" },
  { label: "Research", value: 14, amount: "14%" },
  { label: "Student Services", value: 12, amount: "12%" },
  { label: "Operations", value: 9, amount: "9%" },
];

export default function InstitutionalDataPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-700">
      <section className="bg-[#0B1C30] px-6 py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold text-[#DDA83A]">
              FUHSA Home
            </Link>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-5xl">
              Institutional Data
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              A structured dashboard for institutional records, academic
              capacity, and projected financial flow.
            </p>
          </div>
          <Link
            href="/annual-budget"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10"
          >
            Annual Budget
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Faculties
          </p>
          <p className="mt-3 text-4xl font-bold text-[#0B1C30]">5</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Departments
          </p>
          <p className="mt-3 text-4xl font-bold text-[#0B1C30]">26</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Students
          </p>
          <p className="mt-3 text-4xl font-bold text-[#0B1C30]">5000+</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-serif text-2xl font-bold text-[#0B1C30]">
              Institutional Structure Table
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">Data Unit</th>
                  <th className="px-6 py-4 font-semibold">Value</th>
                  <th className="px-6 py-4 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {institutionalRows.map((row) => (
                  <tr key={row.unit} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-[#0B1C30]">
                      {row.unit}
                    </td>
                    <td className="px-6 py-4">{row.count}</td>
                    <td className="px-6 py-4">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="font-serif text-2xl font-bold text-[#0B1C30]">
            Financial Flow Projection
          </h2>
          <div className="mt-7 space-y-5">
            {financialFlow.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                  <span>{item.label}</span>
                  <span className="text-[#0B1C30]">{item.amount}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-[#DDA83A]"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
