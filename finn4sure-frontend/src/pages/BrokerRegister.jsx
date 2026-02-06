import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function BrokerRegistration() {
  const navigate = useNavigate();

  // ---------------- FORM STATES ----------------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [password, setPassword] = useState("");

  // ---------------- UI STATES ----------------
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // form-wide error
  const [otpError, setOtpError] = useState(""); // OTP-specific error

  // ---------------- OTP TIMER ----------------
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const API_BASE = "http://localhost:5000/api/auth";

  // ---------------- RESEND TIMER LOGIC ----------------
  useEffect(() => {
    let timer;

    if (otpSent && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }

    if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  // ---------------- SEND OTP ----------------
  const sendOTP = async () => {
    if (number.length !== 10) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      setError("");
      setLoading(true);
      setOtpError("");

      const res = await fetch(`${API_BASE}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setOtpSent(true);
      setResendTimer(60);
      setCanResend(false);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOTP = async () => {
    if (receivedOtp.length !== 4) {
      setOtpError("OTP must be 4 digits");
      return;
    }

    try {
      setOtpError("");
      setLoading(true);

      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
        credentials : "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, otp: receivedOtp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.message || "OTP verification failed");
        return;
      }

      setOtpVerified(true);
    } catch (err) {
      setOtpError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SIGNUP ----------------
  const submitForm = async () => {
    if (!otpVerified) {
      setError("Please verify OTP before signup");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const payload = { name: fullName, email,
        number, password, role: "broker" };

      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        credentials : "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/Broker-Dashboard");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Create your <span className="text-blue-700">Finn4sure</span> account
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Register now and become partner.
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-5">
          {/* NAME */}
          <input
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* MOBILE NUMBER */}
          <input
            type="tel"
            placeholder="10-digit mobile number"
            value={number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (!otpVerified && val.length <= 10) setNumber(val);
            }}
            disabled={otpVerified} // can't change after OTP verified
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {/* SEND OTP BUTTON */}
          <button
            type="button"
            onClick={sendOTP}
            disabled={loading || otpSent}
            className="bg-black hover:bg-black/80 transition duration-500 h-12 w-full rounded-md text-white disabled:opacity-50"
          >
            {otpSent ? "OTP Sent" : "Send OTP"}
          </button>

          {/* OTP VERIFICATION */}
          {otpSent && (
            <>
              <p className="text-sm text-slate-600 text-center">
                OTP sent to your mobile number
              </p>

              {!canResend ? (
                <p className="text-sm text-center text-slate-500">
                  Resend OTP in{" "}
                  <span className="font-semibold">{resendTimer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={sendOTP}
                  className="text-sm text-blue-700 hover:underline text-center"
                >
                  Resend OTP
                </button>
              )}

              <input
                type="text"
                placeholder="Verify OTP"
                value={receivedOtp}
                onChange={(e) =>
                  setReceivedOtp(e.target.value.replace(/\D/g, ""))
                }
                disabled={otpVerified} // lock after verified
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {otpError && (
                <p className="text-sm text-red-600 mt-1">{otpError}</p>
              )}

              <button
                type="button"
                onClick={verifyOTP}
                disabled={loading || otpVerified}
                className="bg-black hover:bg-black/80 transition duration-500 h-12 w-full rounded-md text-white disabled:opacity-50"
              >
                {otpVerified ? "Verified" : "Verify OTP"}
              </button>
            </>
          )}

          {/* SIGNUP BUTTON */}
          <button
            type="button"
            onClick={submitForm}
            disabled={loading || !otpVerified}
            className="w-full py-3 rounded-lg font-medium text-white
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                       hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                       transition disabled:opacity-50"
          >
            Submit
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
