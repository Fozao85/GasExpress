import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layouts/MainLayout';

import { SplashScreen } from './features/customer/screens/SplashScreen';
import { WelcomeScreen } from './features/customer/screens/WelcomeScreen';
import { RegisterScreen } from './features/customer/screens/RegisterScreen';
import { RoleSelectScreen } from './features/customer/screens/RoleSelectScreen';
import { LoginScreen } from './features/customer/screens/LoginScreen';
import { OtpScreen } from './features/customer/screens/OtpScreen';
import { ForgotPasswordScreen } from './features/customer/screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from './features/customer/screens/ResetPasswordScreen';

import { VendorLoginScreen } from './features/vendor/screens/LoginScreen';
import { VendorRegisterScreen } from './features/vendor/screens/RegisterScreen';
import { VendorOtpScreen } from './features/vendor/screens/OtpScreen';
import { PendingApprovalScreen } from './features/vendor/screens/PendingApprovalScreen';
import { VendorDashboardScreen } from './features/vendor/screens/DashboardScreen';
import { VendorOrdersScreen } from './features/vendor/screens/OrdersScreen';
import { VendorOrderDetailScreen } from './features/vendor/screens/OrderDetailScreen';
import { VendorInventoryScreen } from './features/vendor/screens/InventoryScreen';
import { VendorProfileScreen } from './features/vendor/screens/ProfileScreen';

import { RiderLoginScreen } from './features/rider/screens/LoginScreen';
import { RiderRegisterScreen } from './features/rider/screens/RegisterScreen';
import { RiderOtpScreen } from './features/rider/screens/OtpScreen';
import { RiderDashboardScreen } from './features/rider/screens/DashboardScreen';
import { AvailableDeliveriesScreen } from './features/rider/screens/AvailableDeliveriesScreen';
import { ActiveDeliveryScreen } from './features/rider/screens/ActiveDeliveryScreen';
import { ActiveDeliveryDetailScreen } from './features/rider/screens/ActiveDeliveryDetailScreen';
import { DeliveryHistoryScreen } from './features/rider/screens/DeliveryHistoryScreen';
import { RiderEarningsScreen } from './features/rider/screens/EarningsScreen';
import { RiderPendingApprovalScreen } from './features/rider/screens/PendingApprovalScreen';
import { RiderProfileScreen } from './features/rider/screens/ProfileScreen';

import { AdminLoginScreen } from './features/admin/screens/LoginScreen';
import { AdminDashboardScreen } from './features/admin/screens/DashboardScreen';
import { AdminUsersScreen } from './features/admin/screens/UsersScreen';
import { AdminVendorsScreen } from './features/admin/screens/VendorsScreen';
import { AdminRidersScreen } from './features/admin/screens/RidersScreen';
import { AdminOrdersScreen } from './features/admin/screens/OrdersScreen';
import { AdminOrderDetailScreen } from './features/admin/screens/OrderDetailScreen';
import { AdminPromotionsScreen } from './features/admin/screens/PromotionsScreen';
import { AdminSettingsScreen } from './features/admin/screens/SettingsScreen';

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
        <Route path="/role-select" element={<RoleSelectScreen />} />
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
        <Route path="/rider/pending-approval" element={<RiderPendingApprovalScreen />} />

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
            <Route path="/vendor/dashboard" element={<VendorDashboardScreen />} />
            <Route path="/vendor/orders" element={<VendorOrdersScreen />} />
            <Route path="/vendor/orders/:id" element={<VendorOrderDetailScreen />} />
            <Route path="/vendor/inventory" element={<VendorInventoryScreen />} />
            <Route path="/vendor/profile" element={<VendorProfileScreen />} />
          </Route>
        </Route>

        {/* Rider protected routes */}
        <Route element={<ProtectedRoute requiredRole="RIDER" redirectTo="/rider/login" />}>
          <Route element={<MainLayout />}>
            <Route path="/rider/dashboard" element={<RiderDashboardScreen />} />
            <Route path="/rider/available" element={<AvailableDeliveriesScreen />} />
            <Route path="/rider/active" element={<ActiveDeliveryScreen />} />
            <Route path="/rider/orders/:id" element={<ActiveDeliveryDetailScreen />} />
            <Route path="/rider/history" element={<DeliveryHistoryScreen />} />
            <Route path="/rider/earnings" element={<RiderEarningsScreen />} />
            <Route path="/rider/profile" element={<RiderProfileScreen />} />
          </Route>
        </Route>

        {/* Admin protected routes */}
        <Route element={<ProtectedRoute requiredRole="ADMIN" redirectTo="/admin/login" />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
            <Route path="/admin/users" element={<AdminUsersScreen />} />
            <Route path="/admin/vendors" element={<AdminVendorsScreen />} />
            <Route path="/admin/riders" element={<AdminRidersScreen />} />
            <Route path="/admin/orders" element={<AdminOrdersScreen />} />
            <Route path="/admin/orders/:id" element={<AdminOrderDetailScreen />} />
            <Route path="/admin/promotions" element={<AdminPromotionsScreen />} />
            <Route path="/admin/settings" element={<AdminSettingsScreen />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
