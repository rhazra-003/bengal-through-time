import React, { useState } from 'react';
import { MapContainer } from '../components/MapContainer';
import { PlaceDrawer } from '../components/PlaceDrawer';
import { LayerControl } from '../components/LayerControl';
import { Place, MapLayersState } from '../types';
import { dataService } from '../services/dataService';
import { Info, Compass, ShieldCheck, MapPin, X } from 'lucide-react';

interface HomePageProps {
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenSearch }) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [layers, setLayers] = useState<MapLayersState>({
    boundary: true,
    districts: true,
    cities: true,
    towns: true,
    villages: false,
    events: true
  });

  const handleSelectDistrict = (districtId: string) => {
    const districtPlaces = dataService.getPlacesByDistrict(districtId);
    if (districtPlaces.length > 0) {
      setSelectedPlace(districtPlaces[0]);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] flex flex-col sm:flex-row overflow-hidden">
      
      {/* Map Engine Viewport */}
      <div className="relative flex-1 h-full">
        <MapContainer
          layers={layers}
          selectedPlace={selectedPlace}
          onSelectPlace={(place) => setSelectedPlace(place)}
          onSelectDistrict={handleSelectDistrict}
        />

        {/* Map Layer Controls */}
        <LayerControl layers={layers} onChange={setLayers} />

        {/* Hero Welcome Badge / Exploration Prompt */}
        {!selectedPlace && (
          <div className="absolute bottom-6 left-6 z-10 hidden sm:block max-w-sm bg-parchment-100/95 backdrop-blur border border-parchment-300 rounded-xl p-4 shadow-xl text-xs space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-sm text-ink">
              <Compass className="w-4 h-4 text-brass-amber" />
              <span>Explore Pre-Partition Bengal (1905)</span>
            </div>
            <p className="text-ink-muted leading-relaxed">
              Click any place marker (e.g. Calcutta, Dacca, Murshidabad, Plassey) or district polygon to inspect historical administrative details, political timelines, and images.
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-parchment-300 text-[11px] text-ink-light">
              <span className="inline-flex items-center gap-1 font-semibold text-brass-amber">
                <ShieldCheck className="w-3.5 h-3.5" /> 9 Divisions • 49 Districts
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Place Side Panel / Mobile Bottom Sheet */}
      <PlaceDrawer
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />

      {/* About Map Modal */}
      {aboutModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-parchment-100 border border-parchment-300 rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4 text-xs relative">
            <button
              onClick={() => setAboutModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-ink-muted hover:text-ink hover:bg-parchment-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-brass-amber">
              <Info className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg text-ink">About This Historical Map</h3>
            </div>

            <p className="text-ink-muted leading-relaxed">
              This map reconstructs the administrative geography of the Lieutenant-Governorship of Bengal immediately before the Partition of Bengal took effect on 16 October 1905.
            </p>

            <div className="bg-parchment-200 p-3 rounded-lg border border-parchment-300 space-y-2">
              <h4 className="font-serif font-bold text-ink text-xs">Primary Historical Baseline:</h4>
              <ul className="list-disc list-inside space-y-1 text-ink-muted text-[11px]">
                <li>Imperial Gazetteer of India (1907–1909)</li>
                <li>Survey of India Administrative Maps (1904)</li>
                <li>1901 Census of India (Vol. VI: Bengal)</li>
              </ul>
            </div>

            <p className="text-ink-light text-[11px]">
              Historical boundaries do not correspond directly to present-day Indian state or Bangladeshi international borders.
            </p>

            <button
              onClick={() => setAboutModalOpen(false)}
              className="w-full bg-brass-amber text-parchment-100 font-serif font-bold py-2 rounded-lg hover:bg-amber-900 transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
