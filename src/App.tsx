import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import BookMeals from "./pages/BookMeals";
import FindMess from "./pages/FindMess";
import Payment from "./pages/Payment";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex w-full">
    <AppSidebar />
    <div className="flex-1 flex flex-col">
      <header className="h-16 border-b border-border flex items-center px-6 bg-card sticky top-0 z-10">
        <SidebarTrigger />
      </header>
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/book-meals" element={<Layout><BookMeals /></Layout>} />
            <Route path="/find-mess" element={<Layout><FindMess /></Layout>} />
            <Route path="/payment" element={<Layout><Payment /></Layout>} />
            <Route path="/history" element={<Layout><History /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/help" element={<Layout><Help /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
