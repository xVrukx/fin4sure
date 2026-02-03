import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Apply from "../pages/Apply";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Calculator from "../pages/Calculator";
import BrokerRegistration from "../pages/BrokerRegister";
import { BrokerDashboard } from "../pages/Brokerdashboard";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/EMI-calculator" element={<Calculator />} />
        <Route path="/broker-register" element= {<BrokerRegistration />}/>
        <Route path="/broker-register" element= {<BrokerDashboard />}/>
      </Routes>
    </Layout>
  );
}
