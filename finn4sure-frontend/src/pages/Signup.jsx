import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setnumber] = useState("");
  const [recivedotp, setrecivedotp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // otpsender
  const sendOTP = async(number) => {
    const res = await fetch("http://localhost:5000/auth/sendOTP",{
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify({number})
    })
    if(!res.ok){
      return res.json({message : "error occore while sending otp"})
    }
    return res.status(200).json({message : "OTP was sent sucessfully"})
  }

  const VerifyOTP = async() => {
    const res = await fetch("http://localhost:5000/auth/VerifyOTP",{
      method : "POST",
      headers : {"content/Type" : "application/json"},
      body : JSON.stringify({recivedotp, number})
    })
    if(!res.ok){
      return await res.status(402).json({message : "error occored while verifying user"})
    }
    return res.status(200).json({message : "user verified"})
  }

  const FormSender = async() => {
    const res = await fetch("http://localhost:5000/auth/signup",{
      method : "POST",
      headers : {"content-Type" : "application/json"},
      body : JSON.stringify({
        name : fullName, email : email,
        number : number, password : password,
        role : "client"
      })
    })
    if(!res.ok){
      return res.status(402).json({message : "error occored while sending the data back to the server"})
    }
    return res.status(200).json({message : "user singuped successfully"})
  }
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!fullName.trim() || !email.trim() || !number.trim() || !password.trim()) {
  //     setError("All fields are required.");
  //     return;
  //   }

  //   if (number.length !== 10) {
  //     setError("Please enter a valid 10-digit number number.");
  //     return;
  //   }

  //   setError("");

  //   // Mock signup → auto login
  //   login({
  //     name: fullName,
  //     email,
  //   });

  //   navigate("/apply");
  // }

  return (
    <section className="bg-linear-to-b from-blue-50 via-white to-white min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Create your{" "}
          <span className="text-blue-700">Finn4sure</span> account
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Sign up to start your loan application journey.
        </p>

        <div className="mt-6 space-y-5">
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
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              number Number
            </label>
            <input
              type="tel"
              placeholder="10-digit number number"
              value={number}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) setnumber(value);
              }}
              className="mt-2 w-full px-4 py-3 border border-slate-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button className="bg-black hover:bg-black/80 transition duration-500
             h-12 w-20 rounded-md m-2 text-center text-white"
            onClick={sendOTP()}
            >Send OTP</button>
          </div>
          
          <div>
            <input type="text"placeholder="Verify OTP" className="mt-2 w-full
            px-4 py-3 border border-slate-300 rounded-lg focus:outline-none
            focus:ring-2 focus:ring-blue-600"
            value={recivedotp}
            onChange={(e) => {setrecivedotp(e.target.value)}} />

          <button
            className="bg-black hover:bg-black/80 transition duration-500
             h-12 w-20 rounded-md m-2 text-center text-white"
            type="button" onClick={VerifyOTP()}
          >
            Verify OTP
          </button>

          </div>

          <button
            className="w-full py-3 rounded-lg font-medium text-white
                       bg-linear-to-r from-blue-700 via-teal-600 to-emerald-500
                       hover:from-blue-800 hover:via-teal-700 hover:to-emerald-600
                       transition"
            type="button" onClick={FormSender()}
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