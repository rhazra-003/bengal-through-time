import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Place, District, HistoricalEvent } from '../types';
import { Search, X, MapPin, Landmark, Swords, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlaceOnMap?: (place: Place) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isOpen,
  onClose,
  onSelectPlaceOnMap
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = dataService.search(query);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectPlace = (place: Place) => {
    onClose();
    if (onSelectPlaceOnMap) {
      onSelectPlaceOnMap(place);
    } else {
      navigate(`/places/${place.slug}`);
    }
  };

  const handleSelectDistrict = (district: District) => {
    onClose();
    navigate(`/then-vs-now?q=${encodeURIComponent(district.name)}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-parchment-100 border border-parchment-300 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Input Bar */}
        <div className="p-4 bg-parchment-200 border-b border-parchment-300 flex items-center gap-3">
          <Search className="w-5 h-5 text-brass-amber shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Calcutta, Dacca, Murshidabad, Kolkata, Dhaka, Plassey..."
            className="w-full bg-transparent border-none text-base text-ink placeholder:text-ink-light focus:outline-none font-serif"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-ink-muted hover:text-ink hover:bg-parchment-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs">
          
          {query.trim() === '' ? (
            <div className="text-center py-8 text-ink-muted">
              <p className="font-serif text-sm font-semibold">Global Search</p>
              <p className="text-xs text-ink-light mt-1">Search historical or modern names, districts, and battle sites.</p>
            </div>
          ) : (
            <>
              {/* Places */}
              {results.places.length > 0 && (
                <div>
                  <h3 className="font-serif font-bold text-ink text-xs uppercase tracking-wider mb-2 text-brass-amber flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Places & Settlements ({results.places.length})
                  </h3>
                  <div className="space-y-1">
                    {results.places.map((place) => (
                      <button
                        key={place.id}
                        onClick={() => handleSelectPlace(place)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-parchment-200 flex items-center justify-between transition-colors border border-transparent hover:border-parchment-300"
                      >
                        <div>
                          <div className="font-serif font-bold text-sm text-ink">{place.name}</div>
                          <div className="text-xs text-ink-muted">
                            Modern: <strong className="text-ink">{place.modernName}</strong> • {place.historicalStatus}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brass-amber shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Districts */}
              {results.districts.length > 0 && (
                <div>
                  <h3 className="font-serif font-bold text-ink text-xs uppercase tracking-wider mb-2 text-brass-amber flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5" /> 1905 Districts ({results.districts.length})
                  </h3>
                  <div className="space-y-1">
                    {results.districts.map((district) => (
                      <button
                        key={district.id}
                        onClick={() => handleSelectDistrict(district)}
                        className="w-full text-left p-2 rounded-lg hover:bg-parchment-200 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-serif font-semibold text-ink">{district.name} District</div>
                          <div className="text-xs text-ink-muted">{district.modernEquivalent}</div>
                        </div>
                        <span className="text-[10px] bg-parchment-300 px-2 py-0.5 rounded font-semibold text-ink">
                          HQ: {district.headquarters}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {results.events.length > 0 && (
                <div>
                  <h3 className="font-serif font-bold text-ink text-xs uppercase tracking-wider mb-2 text-brass-amber flex items-center gap-1.5">
                    <Swords className="w-3.5 h-3.5" /> Battles & Events ({results.events.length})
                  </h3>
                  <div className="space-y-1">
                    {results.events.map((evt) => (
                      <div key={evt.id} className="p-2 bg-parchment-200/50 rounded-lg border border-parchment-300">
                        <div className="font-serif font-semibold text-ink">{evt.name} ({evt.year})</div>
                        <div className="text-xs text-ink-muted">{evt.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.places.length === 0 && results.districts.length === 0 && results.events.length === 0 && (
                <div className="text-center py-8 text-ink-muted">
                  <p className="font-serif text-sm">No historical entries found matching "{query}"</p>
                  <p className="text-xs text-ink-light mt-1">Try searching alternate spellings like Kalikata, Dhaka, or Palashi.</p>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
};
