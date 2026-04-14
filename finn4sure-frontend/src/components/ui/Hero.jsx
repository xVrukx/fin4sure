import { useState } from "react";

export default function Hero() {
  const [emiCal, setemiCal] = useState(false);
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
  const emiCalculater = async() => {
    setemiCal(!emiCal);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50 via-white to-white">
      {/* Decorative Background Glow */}
      <div
        className="absolute -top-32 -right-32 w-125 h-125 
                      bg-blue-200/30 rounded-full blur-3xl"
      />
      <div
        className="absolute -bottom-32 -left-32 w-125 h-125 
                      bg-[#d9a93d]/20 rounded-full blur-3xl"
      />

      <div
        className="relative max-w-7xl mx-auto px-6 py-20 grid 
                      grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT CONTENT */}
        <div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl 
                         font-bold text-slate-900 leading-tight"
          >
            Smarter Loans. <span className="text-blue-700">Faster</span>{" "}
            <span className="text-[#d9a93d]">Decisions.</span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
            Compare, apply, and track loans across multiple banks with complete
            transparency. Finn4sure simplifies your borrowing journey with speed
            and trust.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/products"
              className="px-7 py-3 rounded-lg font-medium text-white
                         bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                         hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                         shadow-md hover:shadow-lg
                         transition duration-300"
            >
              Explore Loans
            </a>

            <button
              className="px-7 py-3 rounded-lg font-medium
                         border border-[#d9a93d] text-[#d9a93d]
                         hover:bg-[#d9a93d]/10
                         transition duration-300"
              onClick={emiCalculater}
            >
              EMI Calculator
            </button>
          </div>
          
  {/* Overlay */}
  {emiCal && (
    <div
      onClick={() => emiCalculater}
      className="fixed inset-0 bg-black/30 z-40"
    />
  )}

  {/* EMI Drawer */}
  <div
    className={`fixed top-0 right-0 h-full w-87.5 bg-white z-50
    shadow-2xl rounded-l-2xl
    transform transition-transform duration-300 ease-in-out
    ${emiCal ? "translate-x-0" : "translate-x-full"}`}
  >
    {/* Header */}
    <div className="p-4 border-b flex items-center justify-between">
      <h2 className="text-lg font-semibold">EMI Calculator</h2>
      <button onClick={emiCalculater}>✕</button>
    </div>

    {/* Body */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-1 gap-5">

          {/* Inputs Card */}
          <div className="bg-white p-3 rounded-2xl border border-blue-100 shadow-sm space-y-3.5">

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
                  max={10000000}
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
                  max={20}
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
                max={tenureType === "years" ? 30 : 360}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="mt-4 w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white p-3 rounded-2xl border border-blue-100 shadow-sm flex flex-col justify-between">
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
          </div>
        </div>
  </div>

          {/* Trust Badges */}
          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
            <span>✔ 25+ Banking Partners</span>
            <span>✔ Instant Eligibility Check</span>
            <span>✔ 100% Transparent</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full max-w-lg mx-auto">
          <img
            src="/images/hero-bg.jpg" // place image inside public folder
            alt="Loan dashboard preview"
            className="w-full h-auto object-contain"
          />
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
