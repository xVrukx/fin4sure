import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoMdNotifications, IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdPeople, MdBusiness, MdAssessment, MdTrendingUp } from "react-icons/md";


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalClients: 245,
    totalBrokers: 32,
    totalLoans: 156,
    pendingApprovals: 18
  });
  const [notifications, setNotifications] = useState(5);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      // Replace with real API calls later
      const res = await fetch("http://localhost:5000/auth/profile", {
        credentials: "include",
      });
      if (!res.ok) navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchStats();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Platform overview and management</p>
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
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <CgProfile size={20} className="text-purple-600" />
                </div>
                <span className="font-medium text-gray-900 hidden sm:block">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center group hover:shadow-md transition">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalClients}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <MdPeople />
                  Total Clients
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center group hover:shadow-md transition">
                <div className="text-4xl font-bold text-green-600 mb-2">{stats.totalBrokers}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <MdBusiness />
                  Total Brokers
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center group hover:shadow-md transition">
                <div className="text-4xl font-bold text-purple-600 mb-2">{stats.totalLoans}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <MdTrendingUp />
                  Total Loans
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center group hover:shadow-md transition">
                <div className="text-4xl font-bold text-orange-600 mb-2">{stats.pendingApprovals}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <MdAssessment />
                  Pending Approvals
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MdPeople size={16} />
                    </div>
                    <div>
                      <p className="font-semibold">New client registered</p>
                      <p className="text-sm text-gray-600">Rahul Sharma - 2 mins ago</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MdBusiness size={16} />
                    </div>
                    <div>
                      <p className="font-semibold">Broker approved</p>
                      <p className="text-sm text-gray-600">Broker ID: BRK123456 - 1 hr ago</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">1 hr ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Admin Stats */}
            <div className="bg-linear-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl mb-4">Platform Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Clients:</span>
                  <span className="font-bold">{stats.totalClients}</span>
                </div>
                <div className="flex justify-between">
                  <span>Brokers:</span>
                  <span className="font-bold">{stats.totalBrokers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue:</span>
                  <span className="font-bold">₹12.5L</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/admin/user-count" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <MdPeople size={20} className="text-blue-600" />
                  User Stats
                </Link>
                <Link to="/admin/brokers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <MdBusiness size={20} className="text-green-600" />
                  Manage Brokers
                </Link>
                <Link to="/admin/clients" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <MdPeople size={20} className="text-purple-600" />
                  View Clients
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
