import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  IoMdNotifications, 
  IoIosArrowDown, 
  IoMdCard, 
  IoMdTimer, 
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
   IoMdLogOut 
} from "react-icons/io";
import { CiCalculator2 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        credentials: "include", // important for cookie JWT
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        navigate("/login"); // redirect if not authorized
      }
    } catch (err) {
      navigate("/login");
    }
  };
  fetchProfile();
}, [navigate]);


  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your loan applications and track progress
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <IoMdNotifications size={24} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CgProfile size={20} className="text-blue-600" />
                </div>
                <span className="font-medium text-gray-900 hidden sm:block">
                  {user.name}
                </span>
                <IoIosArrowDown className="text-gray-500 hidden sm:block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Applications Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <IoMdCard />
                My Applications
              </h2>
              
              <div className="space-y-4">
                {/* Sample Applications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <div>
                    <p className="font-semibold text-gray-900">Home Loan</p>
                    <p className="text-sm text-gray-600">Applied on Jan 15, 2026</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Processing
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                  <div>
                    <p className="font-semibold text-gray-900">Personal Loan</p>
                    <p className="text-sm text-gray-600">Approved on Dec 20, 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1">
                    <IoMdCheckmarkCircle size={16} />
                    Approved
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-red-500">
                  <div>
                    <p className="font-semibold text-gray-900">Car Loan</p>
                    <p className="text-sm text-gray-600">Rejected on Jan 10, 2026</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full flex items-center gap-1">
                    <IoMdCloseCircle size={16} />
                    Rejected
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to="/apply"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  New Application
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">₹0</div>
                <div className="text-sm text-gray-600 mt-1">Total Approved</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-orange-600">2</div>
                <div className="text-sm text-gray-600 mt-1">Pending</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="text-3xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600 mt-1">Completed</div>
              </div>
            </div>
          </div>

          {/* Profile Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-linear-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CgProfile size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{user.name}</h3>
                  <p className="text-blue-100 text-sm">Client ID: {user._id?.slice(-6)}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-medium">{user.number}</span>
                </div>
                {user.pan_card && (
                  <div className="flex justify-between">
                    <span>PAN:</span>
                    <span className="font-medium">{user.pan_card}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/products"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <IoMdCard size={20} className="text-blue-600" />
                  <span>Explore Products</span>
                </Link>
                <Link
                  to="/EMI-calculator"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <CiCalculator2 size={20} className="text-green-600" />
                  <span>EMI Calculator</span>
                </Link>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left text-red-600">
                  <IoMdLogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
