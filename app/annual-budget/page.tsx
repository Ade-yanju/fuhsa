import Link from "next/link";

const annualBudgetRows = [
  { quarter: "Q1", release: "25%", focus: "Start-up operations and personnel" },
  { quarter: "Q2", release: "25%", focus: "Teaching facilities and student services" },
  { quarter: "Q3", release: "30%", focus: "Capital projects and research support" },
  { quarter: "Q4", release: "20%", focus: "Maintenance, audit, and close-out" },
];

const annualFlow = [
  { label: "Q1", value: 25 },
  { label: "Q2", value: 25 },
  { label: "Q3", value: 30 },
  { label: "Q4", value: 20 },
];

export default function AnnualBudgetPage() {
  return (
    <main className="min-h-screen bg-white text-slate-700">
      <section className="bg-[#0B1C30] px-6 py-8 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="text-sm font-semibold text-[#DDA83A]">
              FUHSA Home
            </Link>
            <h1 className="mt-5 font-serif text-4xl font-bold md:text-5xl">
              Annual Budget
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              A reporting page for annual budget structure, quarterly releases,
              and projected annual financial flow.
            </p>
          </div>
          <Link
            href="/institutional-data"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10"
          >
            Institutional Data
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-serif text-2xl font-bold text-[#0B1C30]">
            Annual Flow Chart
          </h2>
          <div className="mt-8 flex h-72 items-end gap-5 border-b border-l border-slate-300 px-4 pb-4">
            {annualFlow.map((item) => (
              <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-md bg-[#5CB8A5]"
                  style={{ height: `${item.value * 7}px` }}
                />
                <span className="text-sm font-bold text-[#0B1C30]">
                  {item.label}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-6">
            <h2 className="font-serif text-2xl font-bold text-[#0B1C30]">
              Budget Release Table
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">Period</th>
                  <th className="px-6 py-4 font-semibold">Projected Flow</th>
                  <th className="px-6 py-4 font-semibold">Primary Focus</th>
                </tr>
              </thead>
              <tbody>
                {annualBudgetRows.map((row) => (
                  <tr key={row.quarter} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-semibold text-[#0B1C30]">
                      {row.quarter}
                    </td>
                    <td className="px-6 py-4">{row.release}</td>
                    <td className="px-6 py-4">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-6 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Academic Capacity
            </p>
            <p className="mt-2 text-3xl font-bold text-[#0B1C30]">5 Faculties</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Delivery Units
            </p>
            <p className="mt-2 text-3xl font-bold text-[#0B1C30]">
              26 Departments
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Student Population
            </p>
            <p className="mt-2 text-3xl font-bold text-[#0B1C30]">
              5000+ Students
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
