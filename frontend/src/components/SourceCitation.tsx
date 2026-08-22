import React from 'react';
import { PlaceSourceLink } from '../types';
import { dataService } from '../services/dataService';
import { BookOpen, ExternalLink } from 'lucide-react';

interface SourceCitationProps {
  sources: PlaceSourceLink[];
}

export const SourceCitation: React.FC<SourceCitationProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-parchment-200/60 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-3">
      <div className="flex items-center gap-2 border-b border-parchment-300 pb-2">
        <BookOpen className="w-4 h-4 text-brass-amber" />
        <h4 className="font-serif font-bold text-sm text-ink">Historical Sources & Citations</h4>
      </div>

      <ol className="space-y-2 text-xs list-decimal list-inside text-ink-muted">
        {sources.map((srcLink, idx) => {
          const masterSource = dataService.getSourceById(srcLink.sourceId);
          return (
            <li key={idx} className="leading-relaxed">
              <strong className="text-ink font-serif font-semibold">
                {masterSource ? masterSource.title : srcLink.sourceId}
              </strong>
              {masterSource && masterSource.publicationYear && (
                <span> ({masterSource.publicationYear})</span>
              )}
              {srcLink.pages && <span>, {srcLink.pages}</span>}.
              {masterSource?.publisher && <span> Publisher: {masterSource.publisher}.</span>}
              {masterSource?.url && (
                <a
                  href={masterSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1.5 text-brass-amber hover:underline inline-flex items-center gap-0.5 font-sans"
                >
                  View Record <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
