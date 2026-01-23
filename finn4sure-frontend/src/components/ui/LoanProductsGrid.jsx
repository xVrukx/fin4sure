import { LOAN_PRODUCTS } from "../../utils/constants";
import { Link } from "react-router-dom";

export default function LoanProductsGrid() {
  return (
    <section className="bg-linear-to-b from-white to-blue-50/40">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <header className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Explore Our{" "}
            <span className="text-blue-700">Loan Products</span>
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Choose from a wide range of loan solutions tailored for individuals,
            businesses, and enterprises. Compare options and apply with ease.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOAN_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="group bg-white border border-blue-100 rounded-xl p-6
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition">
                {product.name}
              </h3>

              <p className="mt-2 text-slate-600 text-sm">
                {product.description}
              </p>

              <Link
                to={`/products/${product.id}`}
                className="inline-flex items-center mt-4 text-sm font-medium
                           text-blue-700 hover:text-[#d9a93d] transition"
              >
                Learn more
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
