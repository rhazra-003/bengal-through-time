import React, { useState } from 'react';
import { MapLayersState } from '../types';
import { Layers, ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface LayerControlProps {
  layers: MapLayersState;
  onChange: (newLayers: MapLayersState) => void;
}

export const LayerControl: React.FC<LayerControlProps> = ({ layers, onChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleLayer = (key: keyof MapLayersState) => {
    onChange({
      ...layers,
      [key]: !layers[key]
    });
  };

  return (
    <div className="absolute top-4 right-4 z-20 bg-parchment-100/95 backdrop-blur border border-parchment-300 rounded-lg shadow-lg text-xs font-serif overflow-hidden transition-all w-48">
      
      {/* Header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full px-3 py-2 bg-parchment-200 border-b border-parchment-300 font-bold text-ink flex items-center justify-between hover:bg-parchment-300 transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-brass-amber" />
          <span>Map Layers</span>
        </div>
        {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {/* Toggles List */}
      {!collapsed && (
        <div className="p-2 space-y-1">
          <label className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-parchment-200 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.boundary}
              onChange={() => toggleLayer('boundary')}
              className="accent-brass-amber rounded"
            />
            <span className="text-ink">1905 Boundary</span>
          </label>

          <label className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-parchment-200 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.districts}
              onChange={() => toggleLayer('districts')}
              className="accent-brass-amber rounded"
            />
            <span className="text-ink">Districts</span>
          </label>

          <label className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-parchment-200 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.cities}
              onChange={() => toggleLayer('cities')}
              className="accent-brass-amber rounded"
            />
            <span className="text-ink">Cities & Capitals</span>
          </label>

          <label className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-parchment-200 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.towns}
              onChange={() => toggleLayer('towns')}
              className="accent-brass-amber rounded"
            />
            <span className="text-ink">Towns</span>
          </label>

          <label className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-parchment-200 cursor-pointer">
            <input
              type="checkbox"
              checked={layers.events}
              onChange={() => toggleLayer('events')}
              className="accent-brass-amber rounded"
            />
            <span className="text-ink">Battles & Events</span>
          </label>
        </div>
      )}

    </div>
  );
};
