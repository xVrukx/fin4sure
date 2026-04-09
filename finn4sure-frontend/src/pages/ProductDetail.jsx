import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { LOAN_PRODUCTS } from "../utils/constants";
import { Banknote, FileText, CheckCircle } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = LOAN_PRODUCTS.find((item) => item.id === slug);

  const [activeTab, setActiveTab] = useState("overview");
  const [mode, setMode] = useState("all");
  const [scrollProgress, setScrollProgress] = useState(0);

  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const eligibilityRef = useRef(null);
  const documentsRef = useRef(null);

  // 🔥 Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        (window.scrollY / totalHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Scroll tracking
  useEffect(() => {
    if (mode !== "all") return;

    const sections = [
      { id: "overview", ref: overviewRef },
      { id: "features", ref: featuresRef },
      { id: "eligibility", ref: eligibilityRef },
      { id: "documents", ref: documentsRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => {
      if (sec.ref.current) observer.observe(sec.ref.current);
    });

    return () => observer.disconnect();
  }, [mode]);

  const handleTabClick = (tab, ref) => {
    setActiveTab(tab);
    setMode("single");
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showAllSections = () => {
    setMode("all");
    setActiveTab("overview");
    overviewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!product) return <div>Product not found</div>;

  const active = "text-red-500";
  const inactive = "text-gray-500";

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white">

      {/* 🔥 Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.75 bg-gray-200 z-50">
        <div
          className="h-full bg-red-500 transition-all"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            {product.name}
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            {product.longDescription}
          </p>

          <Link
            to={`/apply?product=${product.id}`}
            className="mt-6 inline-block px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Apply Now
          </Link>
        </div>

        <div className="hidden md:block">
          <img src="/loan-illustration.png" alt="loan" />
        </div>
      </div>

      {/* TABS */}
      <div className="sticky top-25 bg-white/80 backdrop-blur-md border-b z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-8 text-sm font-medium">

          <button
            onClick={showAllSections}
            className={`py-4 relative ${activeTab === "overview" ? active : inactive}`}
          >
            Overview
            <span className={`absolute bottom-0 left-0 w-full h-0.5 ${activeTab === "overview" ? "bg-red-500" : ""}`} />
          </button>

          <button
            onClick={() => handleTabClick("features", featuresRef)}
            className={`py-4 relative ${activeTab === "features" ? active : inactive}`}
          >
            Features
            <span className={`absolute bottom-0 left-0 w-full h-0.5 ${activeTab === "features" ? "bg-red-500" : ""}`} />
          </button>

          <button
            onClick={() => handleTabClick("eligibility", eligibilityRef)}
            className={`py-4 relative ${activeTab === "eligibility" ? active : inactive}`}
          >
            Eligibility
            <span className={`absolute bottom-0 left-0 w-full h-0.5 ${activeTab === "eligibility" ? "bg-red-500" : ""}`} />
          </button>

          <button
            onClick={() => handleTabClick("documents", documentsRef)}
            className={`py-4 relative ${activeTab === "documents" ? active : inactive}`}
          >
            Documents
            <span className={`absolute bottom-0 left-0 w-full h-0.5 ${activeTab === "documents" ? "bg-red-500" : ""}`} />
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

        {/* OVERVIEW */}
        {(mode === "all" || activeTab === "overview") && (
          <div
            ref={overviewRef}
            className="scroll-mt-32 bg-white p-8 rounded-2xl shadow-sm border transition hover:shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-4">
              Features and Benefits of {product.name}
            </h2>

            <p className="text-gray-600 mb-6">
              {product.overview?.intro}
            </p>

            <p className="text-gray-600 mb-6">
              {product.overview?.description}
            </p>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {product.overview?.points?.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}

        {/* FEATURES */}
        {(mode === "all" || activeTab === "features") && (
          <div
            ref={featuresRef}
            className="scroll-mt-32 bg-white p-8 rounded-2xl shadow-sm border transition hover:shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-8">
              {product.name} Features
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {product.features.map((item, i) => (
                <div
                  key={i}
                  className="p-6 border rounded-xl bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-2"
                >
                  <Banknote className="mb-3 text-blue-600" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ELIGIBILITY */}
        {(mode === "all" || activeTab === "eligibility") && (
          <div
            ref={eligibilityRef}
            className="scroll-mt-32 bg-white p-8 rounded-2xl shadow-sm border"
          >
            <h2 className="text-3xl font-semibold mb-6">
              Eligibility Criteria
            </h2>

            <ul className="space-y-3">
              {product.eligibility.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle className="text-green-500 w-5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* DOCUMENTS */}
        {(mode === "all" || activeTab === "documents") && (
          <div
            ref={documentsRef}
            className="scroll-mt-32 bg-white p-8 rounded-2xl shadow-sm border"
          >
            <h2 className="text-3xl font-semibold mb-6">
              Documents Required
            </h2>

            {product.documents?.map((doc, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center gap-2 font-semibold">
                  <FileText className="w-5 text-blue-600" />
                  {doc.title}
                </div>
                <p className="text-gray-600 ml-7">
                  {doc.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}