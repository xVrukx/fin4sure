export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Decorative Background Glow */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] 
                      bg-blue-200/30 rounded-full blur-3xl"
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] 
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
                         bg-gradient-to-r from-blue-700 via-teal-600 to-emerald-500
                         hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                         shadow-md hover:shadow-lg
                         transition duration-300"
            >
              Explore Loans
            </a>

            <a
              href="/EMI-calculator"
              className="px-7 py-3 rounded-lg font-medium
                         border border-[#d9a93d] text-[#d9a93d]
                         hover:bg-[#d9a93d]/10
                         transition duration-300"
            >
              EMI Calculator
            </a>
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
