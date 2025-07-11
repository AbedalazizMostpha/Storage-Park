import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/CustomerRegister";
import RegisterPartner from "./Pages/PartnerRegister1";
import RegisterPartner2 from "./Pages/PartnerRegister2";
import HomePage from "./Pages/HomePage";
import PartnerHome from "./Pages/PartnerHome";
import { Toaster } from 'react-hot-toast';
import EmailVer from "./Pages/EmailVer"
import Ecommerce from "./Pages/Ecommerce";
import Profile from './Pages/Profile';
import PurchaseSuccessPage from './Pages/PurchaseSuccessPage';
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Category from './Pages/Category';
import ForgotPassword from "./Pages/ForgotPassword";
import ProductPage from "./Pages/ProductPage";
import PaymentForm from './Pages/PaymentForm';
import { useCartStore } from "./stores/useCartStore";
import PartnerDashboard from "./Pages/Partner/PartnerDashboard";
import EmptyCart from "./Pages/EmptyCart";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { ToastContainer } from 'react-toastify';
import NotFound from './Pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import OrderHistory from './Pages/OrderHistory';
import OrderStatus from './Pages/OrderStatus';
import Unauthorized from "./Pages/Unauthorized";

function App() {
  const { checkAuth, checkingAuth, user } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user || !user.isVerified) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        <Toaster />


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-partner-1" element={<RegisterPartner />} />
        <Route path="/register-partner-2" element={<RegisterPartner2 />} />
        <Route path='/notFound' element={<NotFound />} />
        <Route path="/order-status/:orderId" element={<OrderStatus />} />
        <Route path="/product-page/:productId" element={<ProductPage />} />
        <Route path="/register-customer" element={<Register />} />
        <Route path="/partner-info" element={<PartnerHome />} />
        <Route path="/purchase-success" element={<PurchaseSuccessPage />} />
        <Route path="/verify-email" element={<EmailVer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/empty-cart" element={<EmptyCart />} />
        <Route path="/payment-form" element={<PaymentForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/partner/*" element={<PartnerDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </>
  );
}


export default App;