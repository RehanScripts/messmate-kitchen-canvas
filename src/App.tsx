import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Dashboard from "./pages/Dashboard";
import BookMeals from "./pages/BookMeals";
import FindMess from "./pages/FindMess";
import Payment from "./pages/Payment";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card sticky top-0 z-10">
          <SidebarTrigger />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Login Route - No sidebar layout */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Dashboard - No sidebar layout with nested routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          
          {/* User Routes - With sidebar layout */}
          <Route path="/dashboard" element={
            <SidebarProvider defaultOpen={true}>
              <Layout><Dashboard /></Layout>
            </SidebarProvider>
          } />
          
          {/* Redirect root to login */}
          <Route path="/" element={<Login />} />
          
          <Route path="/book-meals" element={
            <SidebarProvider defaultOpen={true}>
              <Layout><BookMeals /></Layout>
            </SidebarProvider>
          } />
          <Route path="/find-mess" element={
            <SidebarProvider defaultOpen={true}>
              <Layout><FindMess /></Layout>
            </SidebarProvider>
          } />
          <Route path="/payment" element={
            <SidebarProvider defaultOpen={true}>
              <Layout><Payment /></Layout>
            </SidebarProvider>
          } />
          <Route path="/history" element={
            <SidebarProvider defaultOpen={true}>
              <Layout><History /></Layout>
            </SidebarProvider>
          } />
          <Route path="/settings" element={
            <SidebarProvider defaultOpen={true}>
              <Layout><Settings /></Layout>
            </SidebarProvider>
          } />
          <Route path="/help" element={
            <SidebarProvider defaultOpen={true}>
              <Layout><Help /></Layout>
            </SidebarProvider>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
