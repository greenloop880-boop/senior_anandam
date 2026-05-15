import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CityGrid from './components/CityGrid';
import TrustMetrics from './components/TrustMetrics';
import VideoTestimonial from './components/VideoTestimonial';
import Features from './components/Features';
import Communities from './components/Communities';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import About from './components/About';
import HomeModification from './components/HomeModification';
import TourModal from './components/TourModal';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Accessibility from './components/Accessibility';
import CommunityDetail from './pages/community/CommunityDetail';
import AllCommunities from './pages/community/AllCommunities';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentPage('all-communities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCommunity = (community) => {
    setSelectedCommunity(community);
    setCurrentPage('community-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToCommunities = () => {
    setCurrentPage('home');
    setSelectedCommunity(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAllCommunities = () => {
    setCurrentPage('all-communities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backFromAllCommunities = () => {
    setCurrentPage('home');
    setSearchParams(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // All communities page
  if (currentPage === 'all-communities') {
    return (
      <AllCommunities
        onBack={backFromAllCommunities}
        openCommunity={openCommunity}
        initialParams={searchParams}
      />
    );
  }

  // Community detail page — standalone, no shared navbar/footer
  if (currentPage === 'community-detail' && selectedCommunity) {
    return (
      <CommunityDetail
        community={selectedCommunity}
        onBack={backToCommunities}
        openTourModal={() => setIsTourModalOpen(true)}
        isTourModalOpen={isTourModalOpen}
        closeTourModal={() => setIsTourModalOpen(false)}
      />
    );
  }

  return (
    <div className="app-container">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        openTourModal={() => setIsTourModalOpen(true)}
      />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onSearch={handleSearch} />
            <CityGrid onCityClick={(cityName) => handleSearch({ location: cityName })} />
            <TrustMetrics />
            <VideoTestimonial />
            <Features />
            <Communities openCommunity={openCommunity} openAllCommunities={openAllCommunities} />
            <CTA />
          </>
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'home-modification' && <HomeModification />}
        {currentPage === 'terms' && <Terms />}
        {currentPage === 'privacy' && <Privacy />}
        {currentPage === 'accessibility' && <Accessibility />}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      <FloatingCTA />
      <TourModal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)} />
    </div>
  );
}

export default App;
