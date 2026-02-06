import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  IoMdNotifications,
  IoMdTimer,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdCard
} from "react-icons/io";

import { IoPeople } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdAccountBalance, MdTrendingUp } from "react-icons/md";


export default function BrokerDashboard() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          navigate("/login");
        }
      } catch {
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
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Broker Dashboard, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your clients, leads and track performance
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
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CgProfile size={20} className="text-green-600" />
                </div>
                <span className="font-medium text-gray-900 hidden sm:block">
                  Broker ID: {user.brokerId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-2">
                  <IoPeople />
                  Total Clients
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-3xl font-bold text-orange-600">5</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-2">
                  <IoMdTimer />
                  Pending Leads
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-3xl font-bold text-green-600">8</div>
                <div className="text-sm text-gray-600 mt-1 flex items-center justify-center gap-2">
                  <MdTrendingUp />
                  Approved Loans
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Clients</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <IoPeople size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Rahul Sharma</p>
                      <p className="text-sm text-gray-600">Home Loan - Processing</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <IoMdCheckmarkCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Priya Patel</p>
                      <p className="text-sm text-gray-600">Personal Loan - Approved</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradiebg-linear-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-4">{user.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ID:</span>
                  <span className="font-medium">{user.brokerId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-medium">{user.number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'approved' ? 'bg-white/20' : 'bg-yellow-300/30'}`}>
                    {user.status || 'pending'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <IoPeople size={20} className="text-blue-600" />
                  View Clients
                </Link>
                <Link to="/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <MdAccountBalance size={20} className="text-green-600" />
                  Manage Leads
                </Link>
                <Link to="/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <IoMdCard size={20} className="text-purple-600" />
                  Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
