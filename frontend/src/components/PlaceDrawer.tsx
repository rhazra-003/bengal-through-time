import React from 'react';
import { Link } from 'react-router-dom';
import { Place } from '../types';
import { dataService } from '../services/dataService';
import { X, ArrowRight, MapPin, Landmark, ShieldCheck, History, Sparkles, Flame } from 'lucide-react';

interface PlaceDrawerProps {
  place: Place | null;
  onClose: () => void;
}

export const PlaceDrawer: React.FC<PlaceDrawerProps> = ({ place, onClose }) => {
  if (!place) return null;

  const district = dataService.getDistrictById(place.districtId);
  const division = dataService.getDivisionById(place.divisionId);

  return (
    <aside className="fixed inset-x-0 bottom-0 z-30 max-h-[85vh] sm:static sm:z-20 sm:w-96 sm:max-h-none sm:h-full bg-parchment-100 border-t sm:border-t-0 sm:border-l border-parchment-300 shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
      
      {/* Drawer Header */}
      <div className="p-4 bg-parchment-200 border-b border-parchment-300 flex items-start justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-brass-amber block">
            {place.type.replace('_', ' ')} • 1905
          </span>
          <h2 className="text-xl font-serif font-bold text-ink leading-tight mt-0.5">
            {place.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-ink-muted">
              Modern: <strong className="text-ink font-semibold">{place.modernName}</strong>
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <ShieldCheck className="w-3 h-3 mr-0.5" />
              {place.confidence} Confidence
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-ink-muted hover:text-ink hover:bg-parchment-300 transition-colors"
          aria-label="Close detail panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
        
        {/* Short Summary */}
        <div>
          <h3 className="font-serif font-bold text-ink text-sm mb-1">Historical Overview</h3>
          <p className="text-ink-muted leading-relaxed">
            {place.descriptionShort}
          </p>
        </div>

        {/* Administrative Details */}
        <div className="grid grid-cols-2 gap-2 bg-parchment-200/70 p-3 rounded-lg border border-parchment-300">
          <div className="flex items-start gap-1.5">
            <MapPin className="w-4 h-4 text-brass-amber shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-ink-light block">1905 District</span>
              <span className="font-serif font-semibold text-ink">{district?.name || place.districtId}</span>
            </div>
          </div>
          <div className="flex items-start gap-1.5">
            <Landmark className="w-4 h-4 text-brass-amber shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-ink-light block">1905 Division</span>
              <span className="font-serif font-semibold text-ink">{division?.name || place.divisionId}</span>
            </div>
          </div>
        </div>

        {/* Famous Local Specialties & Heritage */}
        {place.famousSpecialties && (
          <div className="bg-amber-900/5 border border-amber-800/20 p-3 rounded-lg space-y-1">
            <div className="flex items-center gap-1.5 font-serif font-bold text-brass-amber text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Famous Specialties & Heritage</span>
            </div>
            <p className="text-ink-muted leading-relaxed text-[11px]">
              {place.famousSpecialties}
            </p>
          </div>
        )}

        {/* Revolutionary & Battle Significance */}
        {place.revolutionarySignificance && (
          <div className="bg-red-950/5 border border-red-900/20 p-3 rounded-lg space-y-1">
            <div className="flex items-center gap-1.5 font-serif font-bold text-red-900 text-xs">
              <Flame className="w-3.5 h-3.5" />
              <span>Revolutionary & Battle History</span>
            </div>
            <p className="text-ink-muted leading-relaxed text-[11px]">
              {place.revolutionarySignificance}
            </p>
          </div>
        )}

        {/* Quick Political Timeline */}
        {place.politicalHistory && place.politicalHistory.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 font-serif font-bold text-ink text-xs mb-2">
              <History className="w-3.5 h-3.5 text-brass-amber" />
              <span>Who Ruled Here?</span>
            </div>
            <div className="space-y-1.5 border-l-2 border-brass-amber/40 pl-3">
              {place.politicalHistory.slice(0, 3).map((entry, idx) => (
                <div key={idx} className="text-[11px]">
                  <span className="font-semibold text-ink">{entry.period}:</span>{' '}
                  <span className="text-ink-muted">{entry.ruler}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Drawer Footer CTA */}
      <div className="p-4 bg-parchment-200 border-t border-parchment-300">
        <Link
          to={`/places/${place.slug}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-brass-amber hover:bg-amber-900 text-parchment-100 font-serif font-bold py-2.5 px-4 rounded-lg shadow transition-colors text-sm"
        >
          <span>Read Full History</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </aside>
  );
};
