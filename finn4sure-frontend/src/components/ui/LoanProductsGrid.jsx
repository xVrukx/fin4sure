import { LOAN_PRODUCTS } from "../../utils/constants";
import { Link } from "react-router-dom";

const PRODUCT_IMAGES = {
  "home-loan": "/images/loans/home-loan.jpeg",
  "loan-against-property": "/images/loans/lap.jpeg",
  "personal-loan": "/images/loans/personal-loan.jpeg",
  "business-loan": "/images/loans/business-loan.jpeg",
  "car-loan": "/images/loans/car-loan.jpg",
  "education-loan": "/images/loans/education-loan.jpeg",
  "gold-loan": "/images/loans/gold-loan.jpeg",
  "commercial-property-loan": "/images/loans/commercial-loan.jpeg",
  "loan-against-security": "/images/loans/security-loan.jpeg",
  "working-capital": "/images/loans/working-capital.jpeg",
  "msme-loan": "/images/loans/msme-loan.jpeg",
  "project-loan": "/images/loans/project-loan.jpeg",
};

// Icon map per loan type
const PRODUCT_ICONS = {
  "home-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  "loan-against-property": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "personal-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  "business-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "car-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 1h8m0-11l3 5h3l1 1v4h-1" />
    </svg>
  ),
  "education-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  "gold-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "working-capital": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  "commercial-property-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
  "loan-against-security": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "msme-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "project-loan": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

// Category tags for each loan type
const PRODUCT_TAGS = {
  "home-loan": "Retail",
  "loan-against-property": "Secured",
  "personal-loan": "Retail",
  "business-loan": "SME",
  "car-loan": "Retail",
  "education-loan": "Retail",
  "gold-loan": "Secured",
  "commercial-property-loan": "Commercial",
  "loan-against-security": "Secured",
  "working-capital": "SME",
  "msme-loan": "SME",
  "project-loan": "Corporate",
};

const TAG_STYLES = {
  Retail: "bg-teal-500/20 text-teal-200 border-teal-400/30",
  Secured: "bg-amber-500/20 text-amber-200 border-amber-400/30",
  SME: "bg-blue-500/20 text-blue-200 border-blue-400/30",
  Commercial: "bg-purple-500/20 text-purple-200 border-purple-400/30",
  Corporate: "bg-rose-500/20 text-rose-200 border-rose-400/30",
};

export default function LoanProductsGrid() {
  return (
    <section className="relative bg-linear-to-b from-slate-50 via-white to-slate-50 py-24 px-4 overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-linear(circle at 1px 1px, #0d9488 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Our Products
            </div>
            <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
              We{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-teal-500">
                  Facilitate
                </span>
                <span
                  className="absolute bottom-1 left-0 w-full h-3 bg-amber-300/40 z-0 -rotate-1 rounded"
                />
              </span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl leading-relaxed">
              Wide range of financial products tailored to your needs — retail,
              business, and everything in between.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-slate-400 text-sm font-medium">
              {LOAN_PRODUCTS.length} products
            </span>
            <div className="h-px w-8 bg-slate-300" />
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
            >
              View all
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 group-hover:bg-teal-200 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {LOAN_PRODUCTS.map((product, index) => {
            const tag = PRODUCT_TAGS[product.id] || "Retail";
            const tagStyle = TAG_STYLES[tag] || TAG_STYLES.Retail;
            const icon = PRODUCT_ICONS[product.id];

            return (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={PRODUCT_IMAGES[product.id]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                {/* Multi-layer overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-slate-900/10 group-hover:from-slate-900/95 group-hover:via-slate-900/50 transition-all duration-300" />

                {/* Teal accent line at bottom - slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-teal-400 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content */}
                <div className="relative z-10 p-5 flex flex-col h-full min-h-55">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-auto">
                    {/* Icon badge */}
                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-teal-500/30 group-hover:border-teal-400/40 transition-all duration-300">
                      {icon}
                    </div>

                    {/* Category tag */}
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${tagStyle}`}>
                      {tag}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="mt-10">
                    <h3 className="text-[17px] font-bold text-white leading-snug mb-1.5 group-hover:text-teal-200 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <p className="text-white/70 text-xs leading-relaxed line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    {/* CTA */}
                    <Link
                      to={`/products/${product.id}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-amber-300 transition-colors duration-200"
                    >
                      Check Eligibility
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-amber-400/20 border border-white/20 group-hover:border-amber-400/40 transition-all duration-300 group-hover:translate-x-0.5">
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom stats bar */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4">
          {[
            { value: "25+", label: "Banking Partners" },
            { value: "₹50Cr+", label: "Loans Facilitated" },
            { value: "48hr", label: "Avg. Approval Time" },
            { value: "100%", label: "Digital Process" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-2xl font-black text-teal-700">{value}</span>
              <span className="text-sm text-slate-500 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}