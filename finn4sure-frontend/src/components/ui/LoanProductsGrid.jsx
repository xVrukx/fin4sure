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

export default function LoanProductsGrid() {
  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Header */}
        <header className="mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            We Facilitate
          </h2>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Wide Range of Financial Products That Suit Your Customer's Needs.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {LOAN_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="relative overflow-hidden rounded-xl shadow-sm 
                         hover:shadow-xl hover:-translate-y-1 
                         transition-all duration-300 group"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-center bg-cover 
                           transition-transform duration-500 
                           group-hover:scale-110"
                style={{
                  backgroundImage: `url(${PRODUCT_IMAGES[product.id]})`,
                }}
              />

              {/* linear Overlay */}
              <div className="absolute inset-0 bg-linear-to-t 
                              from-black/70 via-black/50 to-black/20" />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-white">
                  {product.name}
                </h3>

                <p className="mt-3 text-white/90 text-sm leading-relaxed grow">
                  {product.description}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="inline-flex items-center mt-6 text-sm font-medium
                             text-white hover:text-[#d9a93d] transition"
                >
                  Check Eligibility
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
