import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Apply from "../pages/Apply";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Calculator from "../pages/Calculator";
import BrokerRegistration from "../pages/BrokerRegister";
import BrokerDashboard  from "../pages/Brokerdashboard";
import AdminDashboard from "../pages/AdminDashboard";  // You'll create this
import ClientDashboard from "../pages/ClientDashboard"; // You'll create this
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/EMI-calculator" element={<Calculator />} />
        <Route path="/broker-register" element={<BrokerRegistration />} />

        {/* Protected dashboard routes */}
        <Route
          path="/Broker-dashboard"
          element={
            <ProtectedRoute allowedRole="broker">
              <BrokerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Client-dashboard"
          element={
            <ProtectedRoute allowedRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect unauthorized to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}