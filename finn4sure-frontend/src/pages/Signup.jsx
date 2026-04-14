import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import { states, districtsByState } from "../components/Statedata";

export default function Signup() {
  const navigate = useNavigate();
// ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ---- extra fields for broker ----
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [district, setdistrict] = useState("");

    // ---------------- SIGNUP ----------------
  const submitFormB = async () => {
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
        gender,
        number,
        password: password.trim(),
        role: "broker",
        dob,
        address,
        pincode,
        state,
        district
      };

      const res = await fetch(`https://fin4sure.onrender.com/api/auth/signup`, {
        method: "POST",
        credentials: "include",
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
// ====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
  // ---------------- FORM STATES ----------------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [refBy, setRefBy] = useState("self"); // referral default
  const [brokerId, setBrokerId] = useState(""); // if refBy is broker
  const [gender, setgender] = useState("")

  
  // ---------------- UI STATES ----------------
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // form-wide error
  const [validateemail, setvalidateemail] = useState("")
  const [otpError, setOtpError] = useState(""); // OTP-specific error
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dob, setdob] = useState("");
  const [address, setaddress] = useState("");

  // ---------------- OTP TIMER ----------------
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [ctoggle, setctoggle] = useState("client");

  const API_BASE = "https://fin4sure.onrender.com/api/auth";

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
    { test: (pw) => /[!@#$%^&*(),.?\":{}|<>]/.test(pw), message: "At least 1 special character" },
    { test: (pw) => /[a-zA-Z]/.test(pw), message: "At least 1 letter" },
  ];

  const validatePassword = (pw) => passwordCriteria.map((c) => ({
    message: c.message,
    valid: c.test(pw),
  }));

  const validateEmail = (e) => {
    setEmail(e.target.value);
    if(validator.isEmail(email)) {
      setvalidateemail("email is valid");
    }
    else{
      setvalidateemail("email is invalid");
    };
  };

  const isPasswordStrong = () => validatePassword(password).every((c) => c.valid);

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
  const submitFormC = async () => {
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
        name: fullName,
        email,
        gender,
        number,
        password,
        role: "client",
        broker_id: refBy === "self" || !brokerId.trim() ? "self" : brokerId.trim(),
        // dob,
        // address,
        // pincode,
        // state,
        // district
      };

      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      navigate(data.redirect);
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  const client = (type) => {
    setctoggle(type);
  };

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-screen flex items-center">
      
  <div className="grid grid-cols-1 m-auto">
    <div className="m-auto flex gap-3 mt-5 mb-5">
          <button className="
            group relative px-10 py-5 rounded-2xl
            bg-linear-to-r from-yellow-500 to-amber-400
            text-white text-lg font-semibold
            shadow-lg hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-1 active:scale-95
          "
          onClick={() =>{client("client")}}
          >
            <span className="relative z-10"
            pointer-events-none>Sign up as Client</span>
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition" 
            pointer-events-none></div>
          </button>

          <button className="
            group relative px-10 py-5 rounded-2xl
            bg-linear-to-r from-blue-700 to-indigo-600
            text-white text-lg font-semibold
            shadow-lg hover:shadow-xl
            transition-all duration-300
            hover:-translate-y-1 active:scale-95
          "
          onClick={() =>{client("broker")}}
          >
            <span className="relative z-10"
            pointer-events-none
            >Sign up as Broker</span>
            <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition"
            pointer-events-none></div>
          </button>
          
        </div>
      
{(ctoggle === "client")&&(<div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Create your <span className="text-blue-700">Finn4sure</span> Client account
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Sign up to start your loan application journey. OTP will be sent to your WhatsApp number.
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
            onChange={validateEmail}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
           <p style={{ color: validator.isEmail(email) ? 'green' : 'red' }}>
               {validateemail}
           </p>

          {/* GENDER */}
            <select name="Gender" id="Gender" value={gender} onChange={(e) => {setgender(e.target.value)}}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option value="">---- Select a gender ----</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

          {/* PASSWORD */}
          <div>
            <p className="text-sm text-slate-500 mb-1">
              Password must contain: 8+ chars, uppercase, number, special char, letters.
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
                <p
                  key={i}
                  className={`${rule.valid ? "text-green-600" : "text-red-600"}`}
                >
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
          {/* <input
            type="date"
            placeholder="enter your date of birth"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          /> */}

          

          {/* ADDRESS */}
{/* <div className="flex flex-col">
  <label className="text-sm font-medium text-slate-700 mb-1">
    Address
  </label>
  <input
    type="text"
    placeholder="Enter your address"
    value={address}
    onChange={(e) => setaddress(e.target.value)}
    className="w-full px-4 py-3 border border-slate-300 rounded-lg 
               bg-white text-slate-800
               focus:outline-none focus:ring-2 focus:ring-blue-600
               transition duration-200"
  />
</div> */}

{/* STATE & DISTRICT */}
{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 */}
  {/* STATE */}
  {/* <div className="flex flex-col">
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
 */}
      {/* Dropdown Icon */}
      {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        ▼
      </div>
    </div>
  </div> */}

  {/* DISTRICT */}
  {/* <div className="flex flex-col">
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
 */}
      {/* Dropdown Icon */}
      {/* <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
        ▼
      </div>
    </div>
  </div>

</div> */}

{/* pincode */}
          {/* <input
            type="text"
            placeholder="enter your city pincode"
            maxLength={6}
            value={pincode}
            onChange={(e) => setpincode(e.target.value.replace(/\D/g,""))}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          /> */}

          {/* PASSWORD MATCH FEEDBACK */}
          {confirmPassword && (
            <p
              className={`text-sm mt-1 ${
                password === confirmPassword ? "text-green-600" : "text-red-600"
              }`}
            >
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

          {/* REFERRAL DROPDOWN */}
          <select
            value={refBy}
            onChange={(e) => setRefBy(e.target.value)}
            disabled={otpVerified}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="self">Applying Directly</option>
            <option value="broker">Applying Through Broker</option>
          </select>

          {/* BROKER ID INPUT */}
          {refBy === "broker" && (
            <input
              type="text"
              placeholder="Enter Broker ID"
              value={brokerId}
              onChange={(e) => setBrokerId(e.target.value)}
              disabled={otpVerified}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          )}

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
                OTP sent to your WhatsApp number
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

          {/* SIGNUP BUTTON */}
          <button
            type="button"
            onClick={submitFormC}
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
      </div>)}

      {(ctoggle === "broker")&&(<div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
              <h1 className="text-2xl font-bold text-slate-900">
                Create your <span className="text-blue-700">Finn4sure</span> Broker account
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
                  onChange={validateEmail}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                {/* GENDER */}
                  <select name="Gender" id="Gender" value={gender} onChange={(e) => {setgender(e.target.value)}}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">---- Select a gender ----</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>

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
          placeholder="Enter your address"
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
                  placeholder="enter your city pincode"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setpincode(e.target.value.replace(/\D/g,""))}
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
                  onClick={submitFormB}
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
            </div>)}
            </div>
    </section>
  );
}
