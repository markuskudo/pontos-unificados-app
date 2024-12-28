import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/settings" element={<CustomerSettings />} />
          <Route path="/merchant" element={<MerchantDashboard />} />
          <Route path="/merchant/settings" element={<StoreSettings />} />
          <Route path="/store" element={<VirtualStore />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/store/new-product" element={<NewProduct />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;