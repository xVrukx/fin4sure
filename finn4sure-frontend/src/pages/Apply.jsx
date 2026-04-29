import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LOAN_PRODUCTS } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import { states } from "../components/Statedata";
import { districtsByState } from "../components/Statedata";


export default function Apply() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");

  const { isAuthenticated, user } = useAuth();

  const [product, setProduct] = useState(productId || "");
  const [pan, setPan] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dob, setdob] = useState('');
  const [address, setaddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [pincode, setpincode] = useState('')
  const [state, setstate] = useState('');
  const [district, setdistrict] = useState('');

  const selectedProduct = LOAN_PRODUCTS.find(
    (item) => item.id === product
  );

  const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!product) {
      setError("Please select a loan type.");
      return;
    }

    const cleanPAN = pan.trim().toUpperCase();

    if (!PAN_REGEX.test(cleanPAN)) {
      setError("Enter valid PAN (ABCDE1234F)");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const res = await fetch(
        "https://fin4sure.onrender.com/api/client/apply-loan",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pan: cleanPAN,
            product: product,
            dob: dob,
            address: address,
            state: state,
            district: district,
            pincode: pincode
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Application failed");
      }

      setSuccess("Application submitted successfully!");
      setPan("");

    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(
    () => {
      const load_data = async () => {
    setdob(user?.dob);
    setaddress(user?.address);
    setpincode(user?.pincode)
    setstate(user?.state);
    setdistrict(user?.district);}
    load_data()
  },[user])

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Apply for a <span className="text-blue-700">Loan</span>
        </h1>

        <p className="mt-3 text-slate-600 max-w-xl">
          Submit your PAN details to start your loan application.
        </p>

        {/* Selected Product Banner */}
        {selectedProduct && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 text-slate-700">
            Applying for:
            <span className="font-semibold text-slate-900 ml-2">
              {selectedProduct.name}
            </span>
          </div>
        )}

        {/* Not Logged In */}
        {!isAuthenticated ? (
          <div className="mt-10 bg-white p-6 rounded-xl border border-blue-100">
            <div className="p-4 rounded-lg text-sm
                            bg-[#d9a93d]/10 border border-[#d9a93d]/30
                            text-[#8a6a1f]">
              You must be logged in to submit a loan application.
            </div>

            <a
              href="/login"
              className="mt-4 inline-block px-5 py-2 rounded-lg font-medium text-white
                         bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                         hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                         transition"
            >
              Login to Continue
            </a>
          </div>
        ) : (

          /* Form */
          <form
            onSubmit={handleSubmit}
            className="mt-10 bg-white p-8 rounded-xl border border-blue-100 shadow-sm space-y-7"
          >

            {/* Alerts */}
            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Autofill Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <h3 className="font-semibold text-slate-800 mb-4">
                Applicant Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField label="Full Name" value={user?.name} />
                <InfoField label="Email" value={user?.email} />
                <InfoField label="Mobile" value={user?.number} />
          {/* dob */}
          <input
            type="date"
            placeholder="enter your date of birth *"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          

          {/* ADDRESS */}
<div className="flex flex-col">
  <label className="text-sm font-medium text-slate-700 mb-1">
    Address
  </label>
  <input
    type="text"
    placeholder="Enter your address *"
    value={address}
    onChange={(e) => setaddress(e.target.value)}
    className="w-full px-4 py-3 border border-slate-300 rounded-lg 
               bg-white text-slate-800
               focus:outline-none focus:ring-2 focus:ring-blue-600
               transition duration-200"
  />
</div>

{/* STATE & DISTRICT */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* STATE */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-slate-700 mb-1">
      State
    </label>
    <div className="relative">
      <select
        name="state"
        id="state"
        value={state}
        onChange={(e) => {
          setstate(e.target.value);
          setdistrict("");
        }}
        className="w-full appearance-none px-4 py-3 border border-slate-300 
                   rounded-lg bg-white text-slate-700
                   focus:outline-none focus:ring-2 focus:ring-blue-600
                   transition duration-200"
      >
        <option value="">-- Select a State --</option>
        {states.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/* Dropdown Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        ▼
      </div>
    </div>
  </div>

  {/* DISTRICT */}
  <div className="flex flex-col">
    <label className="text-sm font-medium text-slate-700 mb-1">
      District
    </label>
    <div className="relative">
      <select
        name="District"
        id="District"
        value={district}
        disabled={!state}
        onChange={(e) => setdistrict(e.target.value)}
        className={`w-full appearance-none px-4 py-3 border rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-600
                    transition duration-200
                    ${
                      !state
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
      >
        <option value="">-- Select a District --</option>
        {state &&
          districtsByState[state]?.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
      </select>

      {/* Dropdown Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        ▼
      </div>
    </div>
  </div>

</div>

{/* pincode */}
          <input
            type="text"
            placeholder="enter your city pincode *"
            maxLength={6}
            value={pincode}
            onChange={(e) => setpincode(e.target.value.replace(/\D/g,""))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
              </div>
            </div>

            {/* Loan Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Loan Type <span className="text-red-500">*</span>
              </label>

              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="">Select a loan type</option>

                {LOAN_PRODUCTS.map((loan) => (
                  <option key={loan.id} value={loan.id}>
                    {loan.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PAN */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                PAN Number <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                placeholder="ABCDE1234F *"
                value={pan}
                onChange={(e) =>
                  setPan(e.target.value.toUpperCase())
                }
                maxLength={10}
                className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <p className="text-xs text-slate-500 mt-1">
                Format: 5 letters + 4 numbers + 1 letter
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !product}
              className="w-full py-3 rounded-lg font-medium text-white
                         bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                         hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                         transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

          </form>
        )}
      </div>
    </section>
  );
}

/* Small reusable display field */
function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 px-3 py-2 bg-white border border-slate-200 rounded-md text-slate-700">
        {value || "-"}
      </p>
    </div>
  );
}
