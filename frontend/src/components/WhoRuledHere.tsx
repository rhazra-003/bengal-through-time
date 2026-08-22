import React from 'react';
import { PoliticalControlEntry } from '../types';
import { History, Crown, Shield } from 'lucide-react';

interface WhoRuledHereProps {
  politicalHistory: PoliticalControlEntry[];
  placeName: string;
}

export const WhoRuledHere: React.FC<WhoRuledHereProps> = ({ politicalHistory, placeName }) => {
  if (!politicalHistory || politicalHistory.length === 0) return null;

  return (
    <div className="bg-parchment-200/80 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-parchment-300 pb-3">
        <Crown className="w-5 h-5 text-brass-amber" />
        <h3 className="font-serif font-bold text-lg text-ink">
          Who Ruled Here? — Political Timeline of {placeName}
        </h3>
      </div>

      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-brass-amber/40">
        {politicalHistory.map((entry, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[21px] top-1 w-3.5 h-3.5 rounded-full bg-parchment-100 border-2 border-brass-amber group-hover:scale-125 transition-transform" />
            
            <div>
              <span className="text-xs font-serif font-bold uppercase tracking-wider text-brass-amber block">
                {entry.period}
              </span>
              <h4 className="font-serif font-semibold text-sm text-ink mt-0.5">
                {entry.ruler}
              </h4>
              {entry.periodDetails && (
                <p className="text-xs text-ink-muted leading-relaxed mt-1">
                  {entry.periodDetails}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
