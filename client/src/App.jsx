import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";
import StoreLocatorPage from "./pages/StoreLocatorPage";
import { SearchProvider } from "./context/SearchContext";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SpecialOffers from "./pages/SpecialOffers";
import Careers from "./pages/Careers";
import FAQ from "./pages/FAQ";
import ShippingReturns from "./pages/ShippingReturns";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PaymentMethods from "./pages/PaymentMethods";
import WarrantyInformation from "./pages/WarrantyInformation";
import AuthCheck from "./components/AuthCheck";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <AuthCheck />
      <BrowserRouter>
        <SearchProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route
                  path="/product/:productId"
                  element={<ProductDetailsPage />}
                />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/cart" element={<CartPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/my-orders" element={<MyOrdersPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Route>

                {/* Public Routes */}
                <Route path="/store-locator" element={<StoreLocatorPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/special-offers" element={<SpecialOffers />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping-returns" element={<ShippingReturns />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/payment-methods" element={<PaymentMethods />} />
                <Route
                  path="/warranty-information"
                  element={<WarrantyInformation />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </SearchProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
