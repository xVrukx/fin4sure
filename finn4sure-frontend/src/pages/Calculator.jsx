import { useState } from "react";

const BANK_RATES = [
  { name: "Select Bank", rate: "" },
  { name: "SBI", rate: 8.25 },
  { name: "HDFC Bank", rate: 8.5 },
  { name: "ICICI Bank", rate: 8.6 },
  { name: "Axis Bank", rate: 8.75 },
  { name: "PNB", rate: 8.4 },
];

export default function Calculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(20);
  const [tenureType, setTenureType] = useState("years"); // "years" | "months"
  const [selectedBank, setSelectedBank] = useState("Select Bank");

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
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Loan <span className="text-blue-700">Calculator</span>
        </h1>

        <p className="mt-3 text-slate-600 max-w-2xl">
          Compare bank interest rates and calculate your EMI instantly.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white p-6 rounded-xl border border-blue-100 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Select Bank
              </label>
              <select
                value={selectedBank}
                onChange={(e) => {
                  const bank = BANK_RATES.find(
                    (b) => b.name === e.target.value
                  );
                  setSelectedBank(e.target.value);
                  if (bank?.rate) setRate(bank.rate);
                }}
                className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {BANK_RATES.map((bank) => (
                  <option key={bank.name} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Interest Rate (% per year)
              </label>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Tenure
              </label>
              <div className="mt-2 flex gap-3">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value)}
                  className="px-3 py-3 border border-slate-300 rounded-lg
                             focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white p-6 rounded-xl border border-blue-100">
            <h2 className="text-xl font-semibold text-slate-900">
              Calculation Result
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-slate-700">
                <span>Monthly EMI</span>
                <span className="font-semibold text-blue-700">
                  ₹ {emi.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-700">
                <span>Total Interest</span>
                <span className="font-semibold text-[#d9a93d]">
                  ₹ {interest.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-700">
                <span>Total Payable</span>
                <span className="font-semibold text-slate-900">
                  ₹ {total.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/apply"
                className="block text-center px-6 py-3 rounded-lg font-medium text-white
                           bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                           hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                           transition"
              >
                Apply for this Loan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}