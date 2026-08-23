import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SearchBar } from './components/SearchBar';

import { HomePage } from './pages/HomePage';
import { PlaceDetailPage } from './pages/PlaceDetailPage';
import { ThenVsNowPage } from './pages/ThenVsNowPage';
import { PrePartitionResearchPage } from './pages/PrePartitionResearchPage';
import { PartitionResearchPage } from './pages/PartitionResearchPage';
import { HowToUsePage } from './pages/HowToUsePage';
import { SourcesPage } from './pages/SourcesPage';
import { AboutPage } from './pages/AboutPage';
import { KnowledgeCheckPage } from './pages/KnowledgeCheckPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-parchment-100 flex flex-col font-sans">
        <Navbar onOpenSearch={() => setSearchOpen(true)} />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onOpenSearch={() => setSearchOpen(true)} />} />
            <Route path="/places/:slug" element={<PlaceDetailPage />} />
            <Route path="/then-vs-now" element={<ThenVsNowPage />} />
            <Route path="/research/pre-partition" element={<PrePartitionResearchPage />} />
            <Route path="/research/partition" element={<PartitionResearchPage />} />
            <Route path="/how-to-use" element={<HowToUsePage />} />
            <Route path="/sources" element={<SourcesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/knowledge-check" element={<KnowledgeCheckPage />} />
          </Routes>
        </div>

        <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
