import React from 'react';
import { dataService } from '../services/dataService';
import { Footer } from '../components/Footer';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export const SourcesPage: React.FC = () => {
  const sources = dataService.getSources();

  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-10 flex-1 space-y-8">
        
        <div className="space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brass-amber bg-parchment-200 px-3 py-1 rounded border border-parchment-300">
            Data Provenance • Bibliography
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink">
            Sources, Gazetteers & Citation Catalog
          </h1>
          <p className="text-ink-muted text-sm max-w-3xl leading-relaxed">
            Historical credibility is paramount. Every boundary line, district population figure, and place history record in Bengal Through Time is anchored in verified primary historical sources, gazetteers, and academic scholarship.
          </p>
        </div>

        <div className="space-y-4">
          {sources.map((src) => (
            <div key={src.id} className="bg-parchment-200 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-serif font-bold text-base text-ink">{src.title}</h3>
                <span className="text-[10px] uppercase font-semibold bg-parchment-300 text-ink px-2.5 py-0.5 rounded">
                  {src.type} • {src.publicationYear}
                </span>
              </div>
              <p className="text-ink-muted font-medium">Author/Editor: {src.author}</p>
              <p className="text-ink-muted italic">{src.citation}</p>
              {src.notes && <p className="text-ink-light leading-relaxed">{src.notes}</p>}
              {src.url && (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brass-amber font-serif font-semibold hover:underline pt-1"
                >
                  Access Digital Archive <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
};
