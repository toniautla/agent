import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import SearchSection from './components/SearchSection';
import ProductGrid from './components/ProductGrid';
import OrderManagement from './components/OrderManagement';
import ShippingCalculator from './components/ShippingCalculator';
import UserDashboard from './components/UserDashboard';
import Footer from './components/Footer';
import ProductSearchPage from './pages/ProductSearchPage';
import OrderManagementPage from './pages/OrderManagementPage';
import PackageConsolidationPage from './pages/PackageConsolidationPage';
import QualityInspectionPage from './pages/QualityInspectionPage';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ResponsibilityDisclaimer from './pages/ResponsibilityDisclaimer';
import AdminDashboard from './components/AdminDashboard';
import AffiliateSystem from './components/AffiliateSystem';
import NotificationSystem from './components/NotificationSystem';
import ErrorBoundary from './components/ErrorBoundary';
import FAQ from './components/FAQ';
import ContactUs from './components/ContactUs';
import LoadingScreen from './components/LoadingScreen';
import { useAuth } from './hooks/useAuth';
import { useOrders } from './hooks/useOrders';

type Section =
  | 'home'
  | 'search'
  | 'orders'
  | 'shipping'
  | 'dashboard'
  | 'product-search'
  | 'order-management'
  | 'shipping-calculator'
  | 'package-consolidation'
  | 'quality-inspection'
  | 'help-center'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'shipping-policy'
  | 'refund-policy'
  | 'responsibility-disclaimer'
  | 'affiliate'
  | 'admin'
  | 'faq'
  | 'contact';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const { user, loading, initialized } = useAuth();
  const { orders } = useOrders();

  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');

    if (path === '/anautonell') {
      setCurrentSection('admin');
    } else if (hash && hash !== currentSection) {
      setCurrentSection(hash as Section);
    }
  }, [currentSection]);

  const handleNavigate = (section: string) => {
    if (section === 'faq') {
      setShowFAQ(true);
      return;
    }
    if (section === 'contact') {
      setShowContact(true);
      return;
    }

    setCurrentSection(section as Section);
    if (section === 'admin') {
      window.history.pushState({}, '', '/anautonell');
    } else {
      window.history.pushState({}, '', '/');
      window.location.hash = section;
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <HowItWorks />
            <ProductGrid />
          </>
        );
      case 'search':
        return (
          <>
            <SearchSection />
            <ProductGrid />
          </>
        );
      case 'orders':
        return <OrderManagement />;
      case 'shipping':
        return <ShippingCalculator />;
      case 'dashboard':
        return <UserDashboard />;
      case 'product-search':
        return <ProductSearchPage />;
      case 'order-management':
        return <OrderManagementPage />;
      case 'shipping-calculator':
        return <ShippingCalculator />;
      case 'package-consolidation':
        return <PackageConsolidationPage />;
      case 'quality-inspection':
        return <QualityInspectionPage />;
      case 'help-center':
        return <HelpCenter />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms-of-service':
        return <TermsOfService />;
      case 'shipping-policy':
        return <ShippingPolicy />;
      case 'refund-policy':
        return <RefundPolicy />;
      case 'responsibility-disclaimer':
        return <ResponsibilityDisclaimer />;
      case 'affiliate':
        return (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AffiliateSystem />
            </div>
          </section>
        );
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <HowItWorks />
            <ProductGrid />
          </>
        );
    }
  };

  if (loading || !initialized) {
    return <LoadingScreen message="Initializing Shipzobuy..." type="default" />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {currentSection !== 'admin' && (
          <Header onNavigate={handleNavigate} currentSection={currentSection} />
        )}
        <main>{renderContent()}</main>
        {currentSection !== 'admin' && <Footer onNavigate={handleNavigate} />}
        <NotificationSystem />
        <FAQ isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
        <ContactUs isOpen={showContact} onClose={() => setShowContact(false)} />
      </div>
    </ErrorBoundary>
  );
}

export default App;