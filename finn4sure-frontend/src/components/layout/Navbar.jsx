import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.jpeg";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="w-full bg-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Finn4sure – Smart Loan Marketplace"
            className="h-25 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <Link to="/" className="hover:text-blue-700 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-blue-700 transition">
            Loans
          </Link>
          <Link to="/calculator" className="hover:text-blue-700 transition">
            Calculator
          </Link>
          <Link
            to="/broker-register"
            className="hover:text-blue-700 transition"
          >
            Become a Partner
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-slate-700 hover:text-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-blue-700 font-medium hover:underline transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3 text-slate-700">
              <span className="text-sm">Hi, {user?.name}</span>
              <button
                onClick={logout}
                className="text-sm underline hover:text-blue-700 transition"
              >
                Logout
              </button>
            </div>
          )}

          <Link
            to="/apply"
            className="hidden md:inline-block px-4 py-2 rounded-md text-white font-medium
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                       hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                       transition"
          >
            Apply Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700 hover:text-blue-700"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-blue-100 bg-white px-6 py-4 space-y-3">
          <Link to="/" className="block text-slate-700 hover:text-blue-700">
            Home
          </Link>
          <Link
            to="/products"
            className="block text-slate-700 hover:text-blue-700"
          >
            Loans
          </Link>
          <Link
            to="/calculator"
            className="block text-slate-700 hover:text-blue-700"
          >
            Calculator
          </Link>
          <Link
            to="/broker-register"
            className="block text-slate-700 hover:text-blue-700"
          >
            Become a Partner
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="block text-slate-700 hover:text-blue-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block font-medium text-blue-700 hover:underline"
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            to="/apply"
            className="block mt-2 px-4 py-2 rounded-md text-white text-center font-medium
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500"
          >
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
}
