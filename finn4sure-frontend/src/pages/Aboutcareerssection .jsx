import { Link } from "react-router-dom";

export const AboutCareersSection = () => {
  return (
    <section className="relative bg-linear-to-b from-white to-slate-50 py-20 px-4 overflow-hidden">
      {/* Subtle background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-linear(circle at 1px 1px, #0d9488 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Get to know us
          </span>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── About Us Card ── */}
          <div className="group relative overflow-hidden rounded-3xl min-h-115 flex flex-col">
            {/* Teal linear background */}
            <div className="absolute inset-0 bg-linear-to-br from-teal-500 via-teal-600 to-teal-700" />

            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full" />
            <div className="absolute top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-800/30 rounded-full" />

            {/* Illustration image */}
            <div className="relative flex-1 flex items-end justify-center pt-10 px-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&auto=format&fit=crop&q=80"
                alt="Our team at Finn4sure"
                className="w-full max-w-105 h-64 object-cover object-top rounded-2xl shadow-2xl shadow-teal-900/40
                           transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Text content */}
            <div className="relative z-10 p-8 pt-6">
              {/* Pill tag */}
              <span className="inline-block bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/25 mb-4">
                Our Story
              </span>

              <h3 className="text-3xl font-black text-white leading-tight mb-2">
                About Us
              </h3>
              <p className="text-teal-100 text-sm leading-relaxed mb-6 max-w-sm">
                How we're building India's most trusted loan comparison platform — with speed, transparency, and zero jargon.
              </p>

              <Link
                to="/about"
                className="group/btn inline-flex items-center gap-3 bg-white text-teal-700 font-bold text-sm
                           px-6 py-3 rounded-2xl shadow-lg shadow-teal-900/20
                           hover:bg-teal-50 hover:shadow-xl transition-all duration-300"
              >
                Know More
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 group-hover/btn:bg-teal-200 group-hover/btn:translate-x-0.5 transition-all duration-200">
                  <svg className="w-3 h-3 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* ── Work With Us Card ── */}
          <div className="group relative overflow-hidden rounded-3xl min-h-115 flex flex-col">
            {/* Amber/gold linear background */}
            <div className="absolute inset-0 bg-linear-to-br from-amber-400 via-amber-500 to-[#c8870a]" />

            {/* Decorative circles */}
            <div className="absolute -top-16 -left-16 w-56 h-56 bg-white/10 rounded-full" />
            <div className="absolute top-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-800/20 rounded-full" />

            {/* Illustration image */}
            <div className="relative flex-1 flex items-end justify-center pt-10 px-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&auto=format&fit=crop&q=80"
                alt="Join the Finn4sure team"
                className="w-full max-w-105 h-64 object-cover object-top rounded-2xl shadow-2xl shadow-amber-900/30
                           transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Text content */}
            <div className="relative z-10 p-8 pt-6">
              {/* Pill tag */}
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-white/30 mb-4">
                We're Hiring
              </span>

              <h3 className="text-3xl font-black text-white leading-tight mb-2">
                Work with Us
              </h3>
              <p className="text-amber-100 text-sm leading-relaxed mb-6 max-w-sm">
                Want to shape the future of fintech in India? Join a team that's fast, ambitious, and mission-driven.
              </p>

              <Link
                to="/careers"
                className="group/btn inline-flex items-center gap-3 bg-white text-amber-700 font-bold text-sm
                           px-6 py-3 rounded-2xl shadow-lg shadow-amber-900/20
                           hover:bg-amber-50 hover:shadow-xl transition-all duration-300"
              >
                Join Us
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 group-hover/btn:bg-amber-200 group-hover/btn:translate-x-0.5 transition-all duration-200">
                  <svg className="w-3 h-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            RBI Compliant
          </span>
          <span className="w-px h-4 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            50+ Team Members
          </span>
          <span className="w-px h-4 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            Pan-India Operations
          </span>
          <span className="w-px h-4 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            4.8 / 5 Rated
          </span>
        </div>
      </div>
    </section>
  );
}