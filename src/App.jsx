import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import PublicHeader from './components/PublicHeader';

// Lazy Loaded Pages
const Splash = lazy(() => import('./pages/Splash'));
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));
const Home = lazy(() => import('./pages/Home'));
const Crafts = lazy(() => import('./pages/Crafts'));
const Craftsmen = lazy(() => import('./pages/Craftsmen'));
const Chat = lazy(() => import('./pages/Chat'));
const Account = lazy(() => import('./pages/Account'));
const CraftsmanProfile = lazy(() => import('./pages/CraftsmanProfile'));
const CreateRequest = lazy(() => import('./pages/CreateRequest'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const ChatDetail = lazy(() => import('./pages/ChatDetail'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const Notifications = lazy(() => import('./pages/Notifications'));
const CraftsmanDashboard = lazy(() => import('./pages/CraftsmanDashboard'));
const Support = lazy(() => import('./pages/Support'));
const ProposalsHistory = lazy(() => import('./pages/ProposalsHistory'));
const ActiveJobs = lazy(() => import('./pages/ActiveJobs'));
const ReviewsHistory = lazy(() => import('./pages/ReviewsHistory'));
const TermsPrivacy = lazy(() => import('./pages/TermsPrivacy'));
const Market = lazy(() => import('./pages/Market'));
const Landing = lazy(() => import('./pages/public/Landing'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));

import ScrollToTop from './components/ScrollToTop';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-[var(--bg-color)]">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
    </div>
  </div>
);

const AppContent = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);

  const publicPaths = ['/login', '/register', '/about', '/contact'];
  const isPublicPage = publicPaths.includes(location.pathname) || (location.pathname === '/' && !isAuthenticated);

  const shouldHideNav = location.pathname.startsWith('/chat/') ||
    location.pathname.startsWith('/craftsman/') ||
    (isPublicPage && !isAuthenticated);

  const shouldHideHeader = location.pathname.startsWith('/chat/') ||
    location.pathname.startsWith('/craftsman/') ||
    (isPublicPage && !isAuthenticated);

  const showPublicHeader = !isAuthenticated && isPublicPage;

  return (
    <div className="app-frame">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop theme={theme === 'dark' ? 'dark' : 'light'} />
      {showPublicHeader && <PublicHeader />}
      {isAuthenticated && !shouldHideHeader && <Header />}

      <div className={`scroll-content ${location.pathname.includes('/chat/') || location.pathname === '/settings/help' ? 'overflow-hidden' : ''}`}>
        <Suspense fallback={<LoadingSpinner />}>
          <ScrollToTop />
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                {/* Role-based Home Routing */}
                <Route path="/" element={
                  localStorage.getItem('userRole') === 'craftsman'
                    ? <CraftsmanDashboard />
                    : <Home />
                } />

                <Route path="/crafts" element={<Crafts />} />
                <Route path="/craftsmen" element={<Craftsmen />} />
                <Route path="/request/new" element={<CreateRequest />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:id" element={<ChatDetail />} />
                <Route path="/craftsman/:id" element={<CraftsmanProfile />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/settings/help" element={<Support />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/settings/:id" element={<SettingsPage />} />
                <Route path="/proposals" element={<ProposalsHistory />} />
                <Route path="/active-jobs" element={<ActiveJobs />} />
                <Route path="/reviews" element={<ReviewsHistory />} />
                <Route path="/terms" element={<TermsPrivacy />} />
                <Route path="/market" element={<Market />} />
                <Route path="/craftsman/dashboard" element={<CraftsmanDashboard />} />
                <Route path="/account" element={<Account onLogout={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('userId');
                  localStorage.removeItem('userRole');
                  setIsAuthenticated(false);
                }} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </Suspense>
      </div>

      {isAuthenticated && !shouldHideNav && <BottomNav />}
    </div>
  );
};

const AppWrapper = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return (
    <Suspense fallback={<LoadingSpinner />}>
      <Splash />
    </Suspense>
  );

  return <AppContent />;
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppWrapper />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

