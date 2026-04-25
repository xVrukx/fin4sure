import { useState } from "react";

export default function Calculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(20);
  const [tenureType, setTenureType] = useState("years");

  function calculateEMI(P, R, tenureValue, type) {
    const months = type === "years" ? tenureValue * 12 : tenureValue;
    const monthlyRate = R / 12 / 100;

    if (!P || !R || !months) return { emi: 0, total: 0, interest: 0 };

    const emi =
      (P * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayable = emi * months;
    const totalInterest = totalPayable - P;

    return {
      emi: Math.round(emi),
      total: Math.round(totalPayable),
      interest: Math.round(totalInterest),
    };
  }

  const { emi, total, interest } = calculateEMI(
    amount,
    rate,
    tenure,
    tenureType
  );

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-2/3">
      <div className="max-w-5xl mx-auto px-6 pt-4 pb-5">
        <h1 className="text-4xl font-bold text-slate-900">
          Loan <span className="text-blue-700">Calculator</span>
        </h1>

        <p className="mt-3 text-slate-600 max-w-2xl">
          Adjust values using sliders or inputs and instantly see your EMI.
        </p>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Inputs Card */}
          <div className="bg-white p-12 rounded-2xl border border-blue-100 shadow-sm space-y-3.5">

            {/* Loan Amount */}
            <div className="flex gap-6">
                <div>
                  <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700">
                    Loan Amount
                  </label>
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 font-medium">
                    ₹ {amount.toLocaleString()}
                  </span>
                </div>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-3 w-full px-4 py-3 border border-slate-300 rounded-xl
                            focus:ring-2 focus:ring-blue-600 outline-none"
                />

                <input
                  type="range"
                  min={50000}
                  max={1000000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="mt-4 w-full accent-blue-600"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700">
                    Interest Rate
                  </label>
                  <span className="px-3 py-1 text-sm rounded-full bg-teal-50 text-teal-700 font-medium">
                    {rate} %
                  </span>
                </div>

                <input
                  type="number"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-3 w-full px-4 py-3 border border-slate-300 rounded-xl
                            focus:ring-2 focus:ring-blue-600 outline-none"
                />

                <input
                  type="range"
                  min={1}
                  max={40}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="mt-4 w-full accent-teal-600"
                />
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700">
                  Loan Tenure
                </label>
                <span className="px-3 py-1 text-sm rounded-full bg-emerald-50 text-emerald-700 font-medium">
                  {tenure} {tenureType}
                </span>
              </div>

              <div className="mt-1 flex gap-2">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full px-4 pt-1 pb-0.5 border border-slate-300 rounded-xl
                             focus:ring-2 focus:ring-blue-600 outline-none"
                />

                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value)}
                  className="px-4 pt-1 pb-0.5 border border-slate-300 rounded-xl
                             focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>

              <input
                type="range"
                min={tenureType === "years" ? 1 : 6}
                max={tenureType === "years" ? 40 : 480}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="mt-4 w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white p-12 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Your EMI Breakdown
              </h2>

              <div className="mt-6 space-y-5">
                <ResultRow label="Monthly EMI" value={emi} highlight />
                <ResultRow label="Total Interest" value={interest} color="gold" />
                <ResultRow label="Total Payable" value={total} />
              </div>
            </div>

            <a
              href="/apply"
              className="mt-5 block text-center px-6 py-4 rounded-xl font-medium text-white
                         bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                         hover:scale-[1.02] transition"
            >
              Apply for this Loan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value, highlight, color }) {
  const colorMap = {
    gold: "text-[#d9a93d]",
    default: "text-slate-900",
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-600">{label}</span>
      <span
        className={`text-lg font-semibold ${
          highlight ? "text-blue-700" : colorMap[color] || colorMap.default
        }`}
      >
        ₹ {value.toLocaleString()}
      </span>
    </div>
  );
}
