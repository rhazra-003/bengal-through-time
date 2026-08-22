import React from 'react';
import { Footer } from '../components/Footer';
import { Landmark, Compass, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 flex-1 space-y-8 text-xs sm:text-sm">
        
        <div className="space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brass-amber bg-parchment-200 px-3 py-1 rounded border border-parchment-300">
            About The Project
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink">
            Bengal Through Time
          </h1>
          <p className="text-ink-muted text-base leading-relaxed">
            Explore the places, people, kingdoms, and events that shaped Bengal.
          </p>
        </div>

        <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-6 shadow-sm space-y-4 text-ink-muted leading-relaxed">
          
          <h2 className="font-serif font-bold text-lg text-ink">Project Objective</h2>
          <p>
            Bengal Through Time is an interactive digital historical atlas designed to reconstruct the historical geography of Bengal immediately before the 1905 Partition took effect on 16 October 1905.
          </p>
          <p>
            Rather than reading historical geography linearly from text, users can explore historical places, administrative divisions, political timelines, and high-resolution photographic archives geographically.
          </p>

          <h2 className="font-serif font-bold text-lg text-ink pt-4">Historical Methodology & Disclaimer</h2>
          <p>
            Historical administrative boundaries under British India (the Lieutenant-Governorship of Bengal) encompassed Bengal proper, Bihar, Orissa, and Chota Nagpur. These historical boundaries do not correspond directly to modern Indian state borders or Bangladeshi international borders.
          </p>

          <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300 space-y-2 mt-2">
            <h3 className="font-serif font-bold text-ink text-sm">Confidence Rating Standard:</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-ink-muted">
              <li><strong>HIGH:</strong> Corroborated by Imperial Gazetteer (1907) and Survey of India maps.</li>
              <li><strong>MEDIUM:</strong> Corroborated by single gazetteer + Wikidata coordinates.</li>
              <li><strong>LOW / UNCERTAIN:</strong> Annotated explicitly in UI where primary sources conflict.</li>
            </ul>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
};
