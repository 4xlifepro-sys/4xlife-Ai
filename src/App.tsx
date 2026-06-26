import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home as HomeIcon, User, Share2, Sparkles, Cpu, LifeBuoy, Activity, LogOut, Shield, MoreVertical } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import NotificationDropdown from './components/NotificationDropdown';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import Referrals from './pages/Referrals';
import Admin from './pages/Admin';
import ValidationAnalytics from './pages/ValidationAnalytics';
import Trades from './pages/Trades';
import Plans from './pages/Plans';
import AICoach from './pages/AICoach';
import Support from './pages/Support';
import Signals from './pages/Signals';
import TodaySignals from './pages/TodaySignals';
import LoadingScreen from './components/LoadingScreen';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function GlobalLayout() {
  const location = useLocation();
  const { user, isAdmin, signOut, loading } = useAuth();
  const isAuthPage = location.pathname.startsWith('/login') || location.pathname.startsWith('/signup') || location.pathname.startsWith('/forgot-password') || location.pathname.startsWith('/reset-password');
  
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Close more menu on click outside or navigation
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.more-menu-container')) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMoreMenuOpen(false);
  }, [location.pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  const primaryNavItems = user ? [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/today-signals', label: 'TODAY\'S SIGNALS', icon: Activity },
    { path: '/plans', label: 'Plans', icon: Sparkles },
    { path: '/ai-coach', label: 'AI Coach', icon: Cpu },
    { path: '/account', label: 'Account', icon: User },
    ...(isAdmin ? [{ path: '/admin', label: 'Admin', icon: Shield }] : []),
  ] : [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/plans', label: 'Plans', icon: Sparkles },
    { path: '/support', label: 'Support', icon: LifeBuoy },
  ];

  const moreNavItems = user ? [
    { path: '/trades', label: 'Trade Monitor', icon: Activity },
    { path: '/validation', label: 'Validation', icon: Activity },
    { path: '/referrals', label: 'Referrals', icon: Share2 },
    { path: '/support', label: 'Support', icon: LifeBuoy },
  ] : [];

  return (
    <div className="min-h-screen bg-[#0A0D12] text-[#E0E4EA] font-sans antialiased flex flex-col">
      <nav className="border-b border-[#202735] bg-[#11141A]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white tracking-tighter">
                4<span className="text-blue-200">x</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">4xLifeAI</span>
            </Link>
            
            <div className="flex flex-1 justify-end min-w-0">
              <div className="flex items-center pr-4 space-x-1 sm:space-x-4">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                      location.pathname === item.path
                        ? "text-blue-400"
                        : "text-[#8A95A5] hover:text-white"
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                ))}
                
                {user && (
                  <div className="relative more-menu-container flex items-center">
                    <button
                      onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                        isMoreMenuOpen ? "text-blue-400" : "text-[#8A95A5] hover:text-white"
                      )}
                    >
                      <MoreVertical className="w-5 h-5 shrink-0" />
                    </button>
                    
                    {isMoreMenuOpen && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-[#11141A] border border-[#202735] rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                        {moreNavItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200",
                              location.pathname === item.path
                                ? "bg-blue-600/10 text-blue-400"
                                : "text-[#8A95A5] hover:bg-[#1A1E26] hover:text-white"
                            )}
                            onClick={() => setIsMoreMenuOpen(false)}
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center shrink-0 border-l border-[#202735] pl-4">
                {!user && !isAuthPage && (
                  <div className="hidden sm:flex items-center space-x-3">
                    <Link
                      to="/login"
                      className="px-4 py-1.5 text-sm font-bold text-white hover:text-blue-400 transition-colors uppercase"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold tracking-wide rounded shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all uppercase"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}

                {user && (
                   <div className="flex items-center gap-4">
                     <div className="hidden sm:block text-right">
                        <div className="text-sm font-bold text-white">{user.user_metadata?.full_name || 'Trader'}</div>
                        <div className="text-xs text-[#5D6B80]">{user.email}</div>
                     </div>
                     <NotificationDropdown />
                     <button 
                       onClick={signOut}
                       className="p-2 text-[#8A95A5] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                       title="Logout"
                     >
                       <LogOut className="w-4 h-4" />
                     </button>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/support" element={<Support />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route path="/test-loading" element={<LoadingScreen />} />
          <Route path="/today-signals" element={<ProtectedRoute><TodaySignals /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/trades" element={<ProtectedRoute><Trades /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/validation" element={<ProtectedRoute><ValidationAnalytics /></ProtectedRoute>} />
          <Route path="/ai-coach" element={<ProtectedRoute><AICoach /></ProtectedRoute>} />
          <Route path="/signals" element={<ProtectedRoute><Signals /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}
