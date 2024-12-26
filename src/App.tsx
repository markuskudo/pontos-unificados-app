import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider, useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerSettings from "./pages/CustomerSettings";
import MerchantDashboard from "./pages/MerchantDashboard";
import StoreSettings from "./pages/StoreSettings";
import VirtualStore from "./pages/VirtualStore";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminReports from "./pages/AdminReports";
import NewProduct from "./pages/NewProduct";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const session = useSession();
  
  if (!session) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && session.user?.user_metadata?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/customer/*"
              element={
                <ProtectedRoute requiredRole="customer">
                  <Routes>
                    <Route path="/" element={<CustomerDashboard />} />
                    <Route path="/settings" element={<CustomerSettings />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/merchant/*"
              element={
                <ProtectedRoute requiredRole="merchant">
                  <Routes>
                    <Route path="/" element={<MerchantDashboard />} />
                    <Route path="/settings" element={<StoreSettings />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
            <Route path="/store" element={<VirtualStore />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="admin">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/users" element={<AdminUsers />} />
                    <Route path="/reports" element={<AdminReports />} />
                    <Route path="/store/new-product" element={<NewProduct />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;