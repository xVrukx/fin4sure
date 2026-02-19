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
  const [confirmPassword, setConfirmPassword] = useState("");

  // ---------------- UI STATES ----------------
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dob, setdob] = useState("");
  const [address, setaddress] = useState("");

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

  // ---------------- PASSWORD VALIDATION ----------------
  const passwordCriteria = [
    { test: (pw) => pw.length >= 8, message: "At least 8 characters" },
    { test: (pw) => /[A-Z]/.test(pw), message: "At least 1 uppercase letter" },
    { test: (pw) => /[0-9]/.test(pw), message: "At least 1 number" },
    { test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw), message: "At least 1 special character" },
    { test: (pw) => /[a-zA-Z]/.test(pw), message: "At least 1 letter" },
  ];

  const validatePassword = (pw) =>
    passwordCriteria.map((c) => ({
      message: c.message,
      valid: c.test(pw),
    }));

  const isPasswordStrong = () => validatePassword(password).every((c) => c.valid);

  // ---------------- SEND OTP ----------------
  const sendOTP = async () => {
    if (loading) return;

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

      if (!res.ok) throw new Error(data.message || "Failed to send OTP");

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
    if (loading) return;

    if (receivedOtp.length !== 4) {
      setOtpError("OTP must be 4 digits");
      return;
    }

    try {
      setOtpError("");
      setLoading(true);

      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: "POST",
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
    if (loading) return;

    if (!otpVerified) {
      setError("Please verify OTP before signup");
      return;
    }
    if (!isPasswordStrong()) {
      setError("Please enter a strong password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const payload = {
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        number,
        password: password.trim(),
        role: "broker",
        dob,
        address
      };

      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      navigate("/login");
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

        <p className="mt-2 text-sm text-slate-600">Register now and become a partner.</p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
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
          <div>
            <p className="text-sm text-slate-500 mb-1">
              Password must: 8+ chars, uppercase, number, special char, letters.
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* PASSWORD VALIDATION */}
            <div className="mt-1 text-sm space-y-1">
              {validatePassword(password).map((rule, i) => (
                <p key={i} className={rule.valid ? "text-green-600" : "text-red-600"}>
                  {rule.valid ? "✔" : "✖"} {rule.message}
                </p>
              ))}
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* dob */}
          <input
            type="date"
            placeholder="enter your date of birth"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* address */}
          <input
            type="text"
            placeholder="enter your address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />


          {confirmPassword && (
            <p className={`text-sm mt-1 ${password === confirmPassword ? "text-green-600" : "text-red-600"}`}>
              {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
            </p>
          )}

          {/* MOBILE NUMBER */}
          <input
            type="tel"
            placeholder="10-digit mobile number"
            value={number}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              if (!otpVerified && val.length <= 10) setNumber(val);
            }}
            disabled={otpVerified}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* SEND OTP */}
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
                  Resend OTP in <span className="font-semibold">{resendTimer}s</span>
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
                onChange={(e) => setReceivedOtp(e.target.value.replace(/\D/g, ""))}
                disabled={otpVerified}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              {otpError && <p className="text-sm text-red-600 mt-1">{otpError}</p>}

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

          {/* SUBMIT */}
          <button
            type="button"
            onClick={submitForm}
            disabled={loading || !otpVerified || !isPasswordStrong() || password !== confirmPassword}
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
