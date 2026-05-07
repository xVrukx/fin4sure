import { useState, useEffect, useRef, useMemo } from "react";

const CARD_WIDTH = 300;
const GAP = 24;
const CARD_TOTAL = CARD_WIDTH + GAP;

const tabLabels = {
  personalLoan: "Personal Loan",
  homeLoan: "Home Loan",
  carLoan: "Car Loan",
};

const loanToTabKey = (loan = "") => {
  const normalized = loan.toLowerCase().replace(/\s+/g, " ").trim();

  if (normalized === "personal loan") return "personalLoan";
  if (normalized === "home loan") return "homeLoan";
  if (normalized === "car loan") return "carLoan";

  return normalized.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
};

const bankAccentClasses = [
  "from-teal-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-green-500",
  "from-indigo-500 to-violet-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-blue-500",
];

export default function BankCarousel() {
  const [banks, setBanks] = useState([]); // raw API rows
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState("personalLoan");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const autoPlayRef = useRef(null);
  const pauseTimerRef = useRef(null);

  const bankRates = async () => {
    const res = await fetch("https://fin4sure.onrender.com/api/admin/bank", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("details not found");
    }

    const data = await res.json();
    setBanks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    bankRates().catch(console.error);
  }, []);

  const groupedBanks = useMemo(() => {
    const map = new Map();

    for (const row of banks) {
      const bankName = row?.name?.trim() || "Unknown Bank";
      if (!map.has(bankName)) {
        map.set(bankName, {
          name: bankName,
          rates: {},
          rawRows: [],
        });
      }

      const item = map.get(bankName);
      const key = loanToTabKey(row?.loan);
      item.rates[key] = row?.intrest_rate;
      item.rawRows.push(row);
    }

    return Array.from(map.values());
  }, [banks]);

  const visibleCount = 3;
  const maxIndex = Math.max(0, groupedBanks.length - visibleCount);

  const goTo = (index) => {
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  useEffect(() => {
    if (!isAutoPlaying || groupedBanks.length <= visibleCount) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, maxIndex, groupedBanks.length]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    pauseTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 6000);
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

      <div className="max-w-6xl mx-auto relative overflow-hidden">
        <button
          onClick={() => {
            goTo(activeIndex - 1);
            pauseAutoPlay();
          }}
          disabled={activeIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => {
            goTo(activeIndex + 1);
            pauseAutoPlay();
          }}
          disabled={activeIndex === maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-gray-600 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="overflow-hidden mx-6">
          <div
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
              transition: isDragging
                ? "none"
                : "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {groupedBanks.map((bank, i) => (
              <BankCard
                key={bank.name}
                bank={bank}
                activeTab={activeTab}
                tabLabels={tabLabels}
                isCenter={i === activeIndex + 1}
                accentClass={bankAccentClasses[i % bankAccentClasses.length]}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              goTo(i);
              pauseAutoPlay();
            }}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "w-6 h-2 bg-teal-600"
                : "w-2 h-2 bg-gray-300 hover:bg-teal-400"
            }`}
          />
        ))}
      </div>

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

function BankCard({ bank, activeTab, tabLabels, isCenter, accentClass }) {
  const rate = bank.rates?.[activeTab];
  const rateNum = Number(rate);

  const getRateColor = (value) => {
    if (!Number.isFinite(value)) return "text-gray-500";
    if (value < 8.6) return "text-green-600";
    if (value < 9.5) return "text-teal-600";
    return "text-amber-600";
  };

  const getRateBg = (value) => {
    if (!Number.isFinite(value)) return "from-gray-50 to-gray-100 border-gray-100";
    if (value < 8.6) return "from-green-50 to-emerald-50 border-green-100";
    if (value < 9.5) return "from-teal-50 to-cyan-50 border-teal-100";
    return "from-amber-50 to-yellow-50 border-amber-100";
  };

  const displayedRate = Number.isFinite(rateNum) ? `${rateNum}%` : "N/A";

  return (
    <div
      className={`shrink-0 w-75 bg-white rounded-2xl border transition-all duration-300 overflow-hidden group ${
        isCenter
          ? "border-teal-300 shadow-xl shadow-teal-100 scale-105"
          : "border-gray-100 shadow-md hover:shadow-xl hover:border-teal-200 hover:-translate-y-1"
      }`}
    >
      <div className={`h-2 w-full bg-linear-to-r ${accentClass}`} />

      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-sm font-bold text-gray-800 leading-tight max-w-35">
                {bank.name}
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-xl border bg-linear-to-br ${getRateBg(rateNum)} p-4 mb-4`}>
          <div className="text-xs text-gray-500 font-medium mb-1">
            {tabLabels[activeTab]} Rate
          </div>
          <div className={`text-3xl font-black ${getRateColor(rateNum)} leading-none`}>
            {displayedRate}
          </div>
          <div className="text-xs text-gray-400 mt-1">per annum onwards</div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { key: "personalLoan", label: "Personal" },
            { key: "homeLoan", label: "Home" },
            { key: "carLoan", label: "Car" },
          ].map(({ key, label }) => {
            const value = bank.rates?.[key];
            const hasValue = value !== undefined && value !== null && value !== "";

            return (
              <div
                key={key}
                className={`rounded-lg p-2 text-center transition-all ${
                  key === activeTab
                    ? "bg-teal-600 text-white"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                <div
                  className={`text-xs font-medium mb-0.5 ${
                    key === activeTab ? "text-teal-100" : "text-gray-400"
                  }`}
                >
                  {label}
                </div>
                <div className="text-sm font-bold">{hasValue ? `${value}%` : "—"}</div>
              </div>
            );
          })}
        </div>

        <button
          className="
            w-full py-2.5 rounded-xl text-sm font-semibold
            transition-all duration-200 border-2 cursor-pointer
            border-green-700 text-green-700
            hover:bg-green-700 hover:text-white
          "
        >
          Apply Now →
        </button>
      </div>
    </div>
  );
}