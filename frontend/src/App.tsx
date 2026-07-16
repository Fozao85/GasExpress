import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';

import { SplashScreen } from './features/customer/screens/SplashScreen';
import { WelcomeScreen } from './features/customer/screens/WelcomeScreen';
import { RegisterScreen } from './features/customer/screens/RegisterScreen';
import { LoginScreen } from './features/customer/screens/LoginScreen';
import { OtpScreen } from './features/customer/screens/OtpScreen';
import { ForgotPasswordScreen } from './features/customer/screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from './features/customer/screens/ResetPasswordScreen';

import { VendorLoginScreen } from './features/vendor/screens/LoginScreen';
import { VendorRegisterScreen } from './features/vendor/screens/RegisterScreen';
import { VendorOtpScreen } from './features/vendor/screens/OtpScreen';
import { PendingApprovalScreen } from './features/vendor/screens/PendingApprovalScreen';

import { RiderLoginScreen } from './features/rider/screens/LoginScreen';
import { RiderRegisterScreen } from './features/rider/screens/RegisterScreen';
import { RiderOtpScreen } from './features/rider/screens/OtpScreen';

import { AdminLoginScreen } from './features/admin/screens/LoginScreen';

import { HomeDashboard } from './features/customer/screens/HomeDashboard';
import { VendorListScreen } from './features/customer/screens/VendorListScreen';
import { VendorDetailScreen } from './features/customer/screens/VendorDetailScreen';
import { SearchResultsScreen } from './features/customer/screens/SearchResultsScreen';
import { PromotionsScreen } from './features/customer/screens/PromotionsScreen';
import { CartScreen } from './features/customer/screens/CartScreen';
import { CheckoutScreen } from './features/customer/screens/CheckoutScreen';
import { OrderConfirmationScreen } from './features/customer/screens/OrderConfirmationScreen';
import { OrdersScreen } from './features/customer/screens/OrdersScreen';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth screens — no layout */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/customer/splash" element={<SplashScreen />} />
        <Route path="/customer/welcome" element={<WelcomeScreen />} />
        <Route path="/customer/register" element={<RegisterScreen />} />
        <Route path="/customer/login" element={<LoginScreen />} />
        <Route path="/customer/otp" element={<OtpScreen />} />
        <Route path="/customer/forgot-password" element={<ForgotPasswordScreen />} />
        <Route path="/customer/reset-password" element={<ResetPasswordScreen />} />

        <Route path="/vendor/login" element={<VendorLoginScreen />} />
        <Route path="/vendor/register" element={<VendorRegisterScreen />} />
        <Route path="/vendor/otp" element={<VendorOtpScreen />} />
        <Route path="/vendor/pending-approval" element={<PendingApprovalScreen />} />

        <Route path="/rider/login" element={<RiderLoginScreen />} />
        <Route path="/rider/register" element={<RiderRegisterScreen />} />
        <Route path="/rider/otp" element={<RiderOtpScreen />} />

        <Route path="/admin/login" element={<AdminLoginScreen />} />

        {/* Customer protected routes */}
        <Route element={<ProtectedRoute requiredRole="CUSTOMER" redirectTo="/customer/login" />}>
          <Route element={<MainLayout />}>
            <Route path="/customer/dashboard" element={<HomeDashboard />} />
            <Route path="/customer/vendors" element={<VendorListScreen />} />
            <Route path="/customer/vendors/:id" element={<VendorDetailScreen />} />
            <Route path="/customer/search" element={<SearchResultsScreen />} />
            <Route path="/customer/promotions" element={<PromotionsScreen />} />
            <Route path="/customer/cart" element={<CartScreen />} />
            <Route path="/customer/checkout" element={<CheckoutScreen />} />
            <Route path="/customer/orders" element={<OrdersScreen />} />
            <Route path="/customer/orders/:id/confirmation" element={<OrderConfirmationScreen />} />
            <Route
              path="/customer/support"
              element={
                <div className="p-4">
                  <h1 className="text-2xl font-bold text-primary-500">Support</h1>
                </div>
              }
            />
          </Route>
        </Route>

        {/* Vendor protected routes */}
        <Route element={<ProtectedRoute requiredRole="VENDOR" redirectTo="/vendor/login" />}>
          <Route element={<MainLayout />}>
            <Route
              path="/vendor/dashboard"
              element={
                <div className="p-4">
                  <h1 className="text-2xl font-bold text-primary-500">Vendor Dashboard</h1>
                </div>
              }
            />
          </Route>
        </Route>

        {/* Rider protected routes */}
        <Route element={<ProtectedRoute requiredRole="RIDER" redirectTo="/rider/login" />}>
          <Route element={<MainLayout />}>
            <Route
              path="/rider/dashboard"
              element={
                <div className="p-4">
                  <h1 className="text-2xl font-bold text-primary-500">Rider Dashboard</h1>
                </div>
              }
            />
          </Route>
        </Route>

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute requiredRole="ADMIN" redirectTo="/admin/login" />}>
          <Route element={<MainLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <div className="p-4">
                  <h1 className="text-2xl font-bold text-primary-500">Admin Dashboard</h1>
                </div>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
