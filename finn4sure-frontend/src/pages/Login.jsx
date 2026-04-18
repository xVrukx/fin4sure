import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ctoggle, setctoggle] = useState("client");
  

  const API_BASE = "https://fin4sure.onrender.com/api/auth";

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        credentials: "include", // ✅ REQUIRED for cookie auth
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ store full user object from backend
      login(data);

      // ✅ re-sync profile (extra safety)
      await fetchProfile();

      // ✅ role-based secure navigation
      if (data.role === "admin") navigate("/admin-dashboard");
      else if (data.role === "broker") navigate("/broker-dashboard");
      else navigate("/client-dashboard");

    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  const client = (type) => {
    setctoggle(type);
  };

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-screen flex items-center">

    <div className="grid grid-cols-1 m-auto">
        <div className="m-auto flex gap-3 mt-5 mb-5">
          <button className={`
    group relative px-10 py-5 rounded-2xl bg-linear-to-r from-yellow-500 to-amber-400 text-white text-lg font-semibold shadow-lg transition-all duration-300 active:scale-95
    ${clientToggle === "client" 
      ? "border-4 border-yellow-700 -translate-y-4 shadow-2xl" // Stays up and adds extra shadow
      : "hover:-translate-y-1 hover:shadow-xl border-4 border-transparent"} 
  `}>
            <span className="relative z-10">Login as Client</span>
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition" 
            onClick={() =>{client("broker")}}></div>
          </button>

          <button className={`
    group relative px-10 py-5 rounded-2xl bg-linear-to-r from-blue-700 to-indigo-600 text-white text-lg font-semibold shadow-lg transition-all duration-300 active:scale-95
    ${clientToggle === "client" 
      ? "border-4 border-blue-700 -translate-y-4 shadow-2xl" // Stays up and adds extra shadow
      : "hover:-translate-y-1 hover:shadow-xl border-4 border-transparent"} 
  `}>
            <span className="relative z-10">Login as Partner</span>
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition"
            onClick={() =>{client("broker")}}></div>
          </button>
          
        </div>

      {(ctoggle === "client")&&(<div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Login to <span className="text-blue-700">Finn4sure</span> as Client
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Please login to continue with your loan application.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium text-white
              bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
              disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>)}

    {/* broker */}
    {(ctoggle === "broker")&&(<div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Login to <span className="text-blue-700">Finn4sure</span> as Partner
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Please login to become a Partner.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium text-white
              bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
              disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>)}
    </div>
    </section>
  );
}
