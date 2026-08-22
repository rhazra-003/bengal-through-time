import React from 'react';
import { Footer } from '../components/Footer';
import { Compass, BookOpen, Search, Layers, Crown, GraduationCap, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowToUsePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 flex-1 space-y-8 text-xs sm:text-sm">
        
        {/* Page Title */}
        <div className="space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brass-amber bg-parchment-200 px-3 py-1 rounded border border-parchment-300">
            User Guide • Educational Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink leading-tight">
            How to Use This Historical Atlas
          </h1>
          <p className="text-ink-muted leading-relaxed text-sm">
            Whether you are a school student, university history researcher, competitive examination candidate (UPSC, WBCS, NET), or a curious history enthusiast, <strong>Bengal Through Time</strong> offers an intuitive, geographical approach to exploring the history of Bengal before the 1905 Partition.
          </p>
        </div>

        {/* Audience Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-full bg-brass-amber text-parchment-100 flex items-center justify-center mb-2">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-ink">Students & Schools</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Visualize 1905 pre-partition administrative boundaries, locate historical capitals (Gour, Murshidabad, Dacca, Calcutta), and understand the geographical layout of colonial Bengal.
            </p>
          </div>

          <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-full bg-brass-amber text-parchment-100 flex items-center justify-center mb-2">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-ink">UPSC & WBCS Aspirants</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Master Indian National Movement topics: Swadeshi Movement, Partition of Bengal, revolutionary secret societies (Anushilan, Jugantar), Alipore Bomb Case, and 1901 census demographics.
            </p>
          </div>

          <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-full bg-brass-amber text-parchment-100 flex items-center justify-center mb-2">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-ink">General History Buffs</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Explore "Who Ruled Here?" political timelines, compare historical vs modern names in Then vs Now, and view authentic archival photographs from the 1860s–1910s.
            </p>
          </div>
        </div>

        {/* Step-by-Step Exploration Instructions */}
        <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="font-serif font-bold text-xl text-ink border-b border-parchment-300 pb-3">
            Core Atlas Features & How to Navigate
          </h2>

          <div className="space-y-5 text-ink-muted">
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-brass-amber text-parchment-100 flex items-center justify-center shrink-0 font-serif font-bold">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-ink flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brass-amber" /> Interactive Historical Map
                </h3>
                <p className="text-xs leading-relaxed">
                  Open the homepage to see the parchment-styled map of 1905 pre-partition Bengal. Zoom into any of the 9 administrative divisions or 49 districts. Hover over district polygons to inspect headquarters and division assignments.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-brass-amber text-parchment-100 flex items-center justify-center shrink-0 font-serif font-bold">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-ink flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brass-amber" /> Map Layer Toggles
                </h3>
                <p className="text-xs leading-relaxed">
                  Use the <strong>Map Layers</strong> control in the top-right corner to toggle 1905 Boundaries, Districts, Cities/Capitals, Towns, and <strong>Battles & Events</strong> (e.g., Battle of Plassey 1757, Battle of Buxar 1764, Santhal Rebellion 1855, Partition Proclamation 1905).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-brass-amber text-parchment-100 flex items-center justify-center shrink-0 font-serif font-bold">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-ink flex items-center gap-2">
                  <Crown className="w-4 h-4 text-brass-amber" /> "Who Ruled Here?" Political Timelines
                </h3>
                <p className="text-xs leading-relaxed">
                  Click any city or town marker to open the side panel or detail page. Inspect the chronological succession of regimes—from Ancient empires, Pala, Sena, Delhi & Bengal Sultanates, Mughals, Nawabs of Bengal, East India Company, to Crown Rule.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-brass-amber text-parchment-100 flex items-center justify-center shrink-0 font-serif font-bold">
                4
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-sm text-ink flex items-center gap-2">
                  <Search className="w-4 h-4 text-brass-amber" /> Global Search & Then vs Now Resolution
                </h3>
                <p className="text-xs leading-relaxed">
                  Press <kbd className="bg-parchment-300 px-1.5 py-0.5 rounded text-[10px] text-ink font-semibold">⌘K</kbd> or click the search bar to search across historical names, modern equivalents, transliterations, and battle sites. Use the <strong>Then vs Now</strong> tab to view district boundaries sorted by 1901 population.
                </p>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-parchment-300">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-brass-amber text-parchment-100 font-serif font-bold px-4 py-2.5 rounded-lg hover:bg-amber-900 transition-colors text-xs shadow"
            >
              Start Exploring the Map Now →
            </Link>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
};
