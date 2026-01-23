export default function Hero() {
  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          Smarter Loans.{" "}
          <span className="text-blue-700">Faster</span>{" "}
          <span className="text-[#d9a93d]">Decisions.</span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Compare, apply, and track loans across multiple banks with complete
          transparency. Finn4sure simplifies your borrowing journey with speed
          and trust.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/products"
            className="px-6 py-3 rounded-lg font-medium text-white
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                       hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                       transition"
          >
            Explore Loans
          </a>

          <a
            href="/calculator"
            className="px-6 py-3 rounded-lg font-medium
                       border border-[#d9a93d] text-[#d9a93d]
                       hover:bg-[#d9a93d]/10 transition"
          >
            EMI Calculator
          </a>
        </div>
      </div>
    </section>
  );
}