import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LOAN_PRODUCTS } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

export default function Apply() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");

  const selectedProduct = LOAN_PRODUCTS.find((item) => item.id === productId);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName.trim() || !mobile.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    console.log({
      fullName,
      mobile,
    });

    alert("Form submitted successfully!");

    setFullName("");
    setMobile("");
  }

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Apply for a{" "}
          <span className="text-blue-700">Loan</span>
        </h1>

        <p className="mt-3 text-slate-600 max-w-xl">
          Fill in your basic details and our team will help you find the best
          loan options from trusted lenders.
        </p>

        {selectedProduct && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 text-slate-700 border border-blue-100">
            You are applying for:{" "}
            <span className="font-semibold text-slate-900">
              {selectedProduct.name}
            </span>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="mt-10 bg-white p-6 rounded-xl border border-blue-100">
            <div className="p-4 rounded-lg text-sm
                            bg-[#d9a93d]/10 border border-[#d9a93d]/30
                            text-[#8a6a1f]">
              You must be logged in to submit a loan application.
            </div>

            <div className="mt-4">
              <a
                href="/login"
                className="inline-block px-5 py-2 rounded-lg font-medium text-white
                           bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                           hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                           transition"
              >
                Login to Continue
              </a>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-white p-6 rounded-xl border border-blue-100 space-y-6"
          >
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Enter your 10-digit mobile number"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setMobile(value);
                  }
                }}
                className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-medium text-white
                         bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                         hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                         transition"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </section>
  );
}