import { useParams, Link } from "react-router-dom";
import { LOAN_PRODUCTS } from "../utils/constants";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = LOAN_PRODUCTS.find((item) => item.id === slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold text-slate-900">Product not found</h1>
        <Link
          to="/products"
          className="mt-4 inline-block text-blue-700 underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-slate-900">
          {product.name.split(" ")[0]}{" "}
          <span className="text-blue-700">
            {product.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          {product.longDescription || product.description}
        </p>

        {/* Features */}
        {product.features && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-slate-900">
              Key <span className="text-[#d9a93d]">Benefits</span>
            </h2>
            <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
              {product.features.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Eligibility */}
        {product.eligibility && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              Eligibility <span className="text-blue-700">Criteria</span>
            </h2>
            <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
              {product.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            to={`/apply?product=${product.id}`}
            className="px-6 py-3 rounded-lg font-medium text-white
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                       hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                       transition"
          >
            Apply for {product.name}
          </Link>

          <Link
            to="/products"
            className="px-6 py-3 rounded-lg font-medium
                       border border-[#d9a93d] text-[#d9a93d]
                       hover:bg-[#d9a93d]/10 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </section>
  );
}
