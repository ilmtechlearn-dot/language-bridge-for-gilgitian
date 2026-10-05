import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { TranslatePage } from './pages/TranslatePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutLanguagesPage } from './pages/AboutLanguagesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { FavouritesPage } from './pages/FavouritesPage';
import { HistoryPage } from './pages/HistoryPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  const [pageParams, setPageParams] = useState<any>(null);

  // Sync hash with browser URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // e.g. #translate?source=english
        const [page, queryString] = hash.split('?');
        setCurrentPage(page || 'home');
        if (queryString) {
          const params = Object.fromEntries(new URLSearchParams(queryString));
          setPageParams(params);
        }
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setPageParams(params || null);
    if (params) {
      const query = new URLSearchParams(params).toString();
      window.location.hash = `${page}?${query}`;
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'translate':
        return <TranslatePage navigate={navigate} initialParams={pageParams} />;
      case 'categories':
        return <CategoriesPage navigate={navigate} initialParams={pageParams} />;
      case 'about-languages':
        return <AboutLanguagesPage navigate={navigate} />;
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'dashboard':
        return <DashboardPage navigate={navigate} />;
      case 'profile':
        return <ProfilePage navigate={navigate} />;
      case 'favourites':
        return <FavouritesPage navigate={navigate} />;
      case 'history':
        return <HistoryPage navigate={navigate} />;
      case 'feedback':
        return <FeedbackPage />;
      case 'admin':
        return <AdminDashboardPage navigate={navigate} />;
      case 'privacy':
        return <PrivacyPolicyPage navigate={navigate} />;
      case 'terms':
        return <TermsPage navigate={navigate} />;
      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
            <Navbar currentPage={currentPage} navigate={navigate} />
            <main className="flex-1">{renderPage()}</main>
            <Footer navigate={navigate} />
          </div>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
