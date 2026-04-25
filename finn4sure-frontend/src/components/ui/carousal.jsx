import { useState, useEffect, useRef } from "react";

const banks = [
  {
    id: 1,
    name: "State Bank of India",
    abbr: "SBI",
    logo: "🏦",
    color: "#1a3c6e",
    accent: "#e8f0ff",
    personalLoan: "10.30%",
    homeLoan: "8.50%",
    carLoan: "8.75%",
    badge: "Most Popular",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "HDFC Bank",
    abbr: "HDFC",
    logo: "🏛️",
    color: "#004C8F",
    accent: "#e6f0ff",
    personalLoan: "10.50%",
    homeLoan: "8.70%",
    carLoan: "8.90%",
    badge: "Fastest Approval",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  {
    id: 3,
    name: "ICICI Bank",
    abbr: "ICICI",
    logo: "🏢",
    color: "#B02A2A",
    accent: "#fff0f0",
    personalLoan: "10.75%",
    homeLoan: "8.75%",
    carLoan: "9.10%",
    badge: "Digital-First",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    id: 4,
    name: "Axis Bank",
    abbr: "AXIS",
    logo: "🏗️",
    color: "#97144D",
    accent: "#fff0f8",
    personalLoan: "10.49%",
    homeLoan: "8.75%",
    carLoan: "8.85%",
    badge: "Low Processing Fee",
    badgeColor: "bg-pink-100 text-pink-700",
  },
  {
    id: 5,
    name: "Punjab National Bank",
    abbr: "PNB",
    logo: "🏠",
    color: "#004225",
    accent: "#e8fff4",
    personalLoan: "11.25%",
    homeLoan: "8.45%",
    carLoan: "8.70%",
    badge: "Best Home Loan",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: 6,
    name: "Kotak Mahindra",
    abbr: "KOTAK",
    logo: "💼",
    color: "#ED1C24",
    accent: "#fff5f5",
    personalLoan: "10.99%",
    homeLoan: "8.85%",
    carLoan: "8.99%",
    badge: "Zero Foreclosure",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 7,
    name: "Bank of Baroda",
    abbr: "BOB",
    logo: "🌐",
    color: "#F47920",
    accent: "#fff8ee",
    personalLoan: "11.05%",
    homeLoan: "8.40%",
    carLoan: "8.65%",
    badge: "Lowest Home Rate",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 8,
    name: "Yes Bank",
    abbr: "YES",
    logo: "✅",
    color: "#00529B",
    accent: "#eef4ff",
    personalLoan: "10.99%",
    homeLoan: "9.00%",
    carLoan: "9.25%",
    badge: "Flexi EMI",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
];

const CARD_WIDTH = 300;
const GAP = 24;
const CARD_TOTAL = CARD_WIDTH + GAP;

export default function BankCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState("personalLoan");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef(null);
  const trackRef = useRef(null);

  const tabLabels = {
    personalLoan: "Personal Loan",
    homeLoan: "Home Loan",
    carLoan: "Car Loan",
  };

  const visibleCount = 3;
  const maxIndex = banks.length - visibleCount;

  const goTo = (index) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, maxIndex]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 6000);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
    setDragOffset(0);
    pauseAutoPlay();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    setDragOffset(x - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) goTo(activeIndex + 1);
    else if (dragOffset > 60) goTo(activeIndex - 1);
    setDragOffset(0);
  };

  const translateX = -(activeIndex * CARD_TOTAL) + dragOffset;

  return (
    <section className="w-full py-16 px-4 bg-linear-to-b from-[#f0f7ff] to-[#faf8f0]">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <span className="inline-block bg-teal-50 text-teal-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-teal-200">
          Live Rates · Updated Daily
        </span>
        <h2 className="text-4xl font-black text-gray-900 mb-3 leading-tight">
          Compare Bank{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-[#B8860B]">
            Loan Rates
          </span>
        </h2>
        <p className="text-gray-500 text-base max-w-lg mx-auto">
          Real-time interest rates from India's top banks. Find the best deal
          before you apply.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-center">
        <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1 shadow-sm">
          {Object.entries(tabLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                pauseAutoPlay();
              }}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === key
                  ? "bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-md"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto relative overflow-hidden">
        {/* Left Arrow */}
        <button
          onClick={() => { goTo(activeIndex - 1); pauseAutoPlay(); }}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => { goTo(activeIndex + 1); pauseAutoPlay(); }}
          disabled={activeIndex === maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Track */}
        <div className="overflow-hidden mx-6">
          <div
            ref={trackRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            className="flex select-none"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? "none" : "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {banks.map((bank, i) => (
              <BankCard
                key={bank.id}
                bank={bank}
                activeTab={activeTab}
                tabLabels={tabLabels}
                isCenter={i === activeIndex + 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); pauseAutoPlay(); }}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "w-6 h-2 bg-teal-600"
                : "w-2 h-2 bg-gray-300 hover:bg-teal-400"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <p className="text-gray-500 text-sm mb-4">
          Rates shown are indicative. Final rates subject to credit profile.
        </p>
        <button className="bg-linear-to-r from-teal-600 to-teal-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:from-teal-700 hover:to-teal-600 transition-all duration-200 text-sm cursor-pointer">
          Check Your Eligibility →
        </button>
      </div>
    </section>
  );
}

function BankCard({ bank, activeTab, tabLabels, isCenter }) {
  const rate = bank[activeTab];
  const rateNum = parseFloat(rate);

  const getRateColor = (rate) => {
    if (rate < 8.6) return "text-green-600";
    if (rate < 9.5) return "text-teal-600";
    return "text-amber-600";
  };

  const getRateBg = (rate) => {
    if (rate < 8.6) return "from-green-50 to-emerald-50 border-green-100";
    if (rate < 9.5) return "from-teal-50 to-cyan-50 border-teal-100";
    return "from-amber-50 to-yellow-50 border-amber-100";
  };

  return (
    <div
      className={`shrink-0 w-75 bg-white rounded-2xl border transition-all duration-300 overflow-hidden group ${
        isCenter
          ? "border-teal-300 shadow-xl shadow-teal-100 scale-105"
          : "border-gray-100 shadow-md hover:shadow-xl hover:border-teal-200 hover:-translate-y-1"
      }`}
    >
      {/* Card Top */}
      <div
        className="h-2 w-full"
        style={{ background: `linear-linear(90deg, ${bank.color}, ${bank.color}cc)` }}
      />

      <div className="p-5">
        {/* Bank Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm"
              style={{ background: bank.accent }}
            >
              {bank.logo}
            </div>
            <div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                {bank.abbr}
              </div>
              <div className="text-sm font-bold text-gray-800 leading-tight max-w-35">
                {bank.name}
              </div>
            </div>
          </div>
        </div>

        {/* Badge */}
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-4 ${bank.badgeColor}`}>
          {bank.badge}
        </span>

        {/* Highlighted Rate */}
        <div className={`rounded-xl border bg-linear-to-br ${getRateBg(rateNum)} p-4 mb-4`}>
          <div className="text-xs text-gray-500 font-medium mb-1">
            {tabLabels[activeTab]} Rate
          </div>
          <div className={`text-3xl font-black ${getRateColor(rateNum)} leading-none`}>
            {rate}
          </div>
          <div className="text-xs text-gray-400 mt-1">per annum onwards</div>
        </div>

        {/* All Rates Grid */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { key: "personalLoan", label: "Personal" },
            { key: "homeLoan", label: "Home" },
            { key: "carLoan", label: "Car" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className={`rounded-lg p-2 text-center transition-all ${
                key === activeTab
                  ? "bg-teal-600 text-white"
                  : "bg-gray-50 text-gray-600"
              }`}
            >
              <div className={`text-xs font-medium mb-0.5 ${key === activeTab ? "text-teal-100" : "text-gray-400"}`}>
                {label}
              </div>
              <div className="text-sm font-bold">{bank[key]}</div>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 cursor-pointer"
          style={{
            borderColor: bank.color,
            color: bank.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = bank.color;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = bank.color;
          }}
        >
          Apply Now →
        </button>
      </div>
    </div>
  );
}