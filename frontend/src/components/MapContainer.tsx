import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { Place, HistoricalEvent, MapLayersState } from '../types';
import { dataService } from '../services/dataService';

interface MapContainerProps {
  layers: MapLayersState;
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  layers,
  selectedPlace,
  onSelectPlace,
  onSelectDistrict
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const placeMarkersRef = useRef<maplibregl.Marker[]>([]);
  const eventMarkersRef = useRef<maplibregl.Marker[]>([]);
  const activePopupRef = useRef<maplibregl.Popup | null>(null);

  const places = dataService.getPlaces();
  const events = dataService.getEvents();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize MapLibre GL map centered over 1905 Bengal
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'carto-positron': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
              'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '&copy; CartoDB &copy; OpenStreetMap'
          }
        },
        layers: [
          {
            id: 'carto-basemap',
            type: 'raster',
            source: 'carto-positron',
            minzoom: 0,
            maxzoom: 18,
            paint: {
              'raster-opacity': 0.7,
              'raster-saturation': -0.45,
              'raster-contrast': 0.1
            }
          }
        ]
      },
      center: [88.5, 23.5],
      zoom: 6.2,
      minZoom: 4.8,
      maxZoom: 13,
      maxBounds: [
        [79.0, 16.0],
        [95.0, 29.5]
      ]
    });

    mapRef.current = map;

    map.on('load', () => {
      // Add Boundary GeoJSON Source & Layers
      map.addSource('bengal-boundary', {
        type: 'geojson',
        data: dataService.getBoundaryGeoJSON()
      });

      map.addLayer({
        id: 'bengal-boundary-fill',
        type: 'fill',
        source: 'bengal-boundary',
        paint: {
          'fill-color': '#f3e6ce',
          'fill-opacity': 0.25
        }
      });

      map.addLayer({
        id: 'bengal-boundary-line',
        type: 'line',
        source: 'bengal-boundary',
        paint: {
          'line-color': '#8b3a0f',
          'line-width': 2.5,
          'line-dasharray': [4, 2]
        }
      });

      // Add Districts GeoJSON Source & Layers
      map.addSource('bengal-districts', {
        type: 'geojson',
        data: dataService.getDistrictsGeoJSON()
      });

      map.addLayer({
        id: 'districts-fill',
        type: 'fill',
        source: 'bengal-districts',
        paint: {
          'fill-color': [
            'match',
            ['get', 'divisionId'],
            'presidency', '#e2d3b7',
            'burdwan', '#d6c39f',
            'rajshahi', '#decb9e',
            'dacca', '#e7d8bc',
            'chittagong', '#d1c0a1',
            'patna', '#e4d5b7',
            'bhagalpur', '#d9c6a5',
            'orissa', '#ded0b5',
            'chota-nagpur', '#cebc99',
            '#ded4be'
          ],
          'fill-opacity': 0.45
        }
      });

      map.addLayer({
        id: 'districts-line',
        type: 'line',
        source: 'bengal-districts',
        paint: {
          'line-color': '#a37248',
          'line-width': 1.2,
          'line-opacity': 0.8
        }
      });

      map.addLayer({
        id: 'districts-highlight',
        type: 'line',
        source: 'bengal-districts',
        paint: {
          'line-color': '#8b3a0f',
          'line-width': 2.8
        },
        filter: ['==', 'id', '']
      });

      // District Hover & Click Handlers
      map.on('mousemove', 'districts-fill', (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          map.getCanvas().style.cursor = 'pointer';
          map.setFilter('districts-highlight', ['==', 'id', feature.properties?.id]);
        }
      });

      map.on('mouseleave', 'districts-fill', () => {
        map.getCanvas().style.cursor = '';
        map.setFilter('districts-highlight', ['==', 'id', '']);
      });

      map.on('click', 'districts-fill', (e) => {
        if (e.features && e.features.length > 0 && onSelectDistrict) {
          const distId = e.features[0].properties?.id;
          if (distId) {
            closeActivePopup();
            onSelectDistrict(distId);
          }
        }
      });

      // Render Markers
      renderPlaceMarkers(map);
      renderEventMarkers(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  // Update Markers when Places or Layer State Changes
  useEffect(() => {
    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      renderPlaceMarkers(mapRef.current);
      renderEventMarkers(mapRef.current);
    }
  }, [layers, selectedPlace]);

  // Handle zooming to selected place
  useEffect(() => {
    if (selectedPlace && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedPlace.longitude, selectedPlace.latitude],
        zoom: 8.5,
        essential: true,
        duration: 1500
      });
    }
  }, [selectedPlace]);

  const closeActivePopup = () => {
    if (activePopupRef.current) {
      activePopupRef.current.remove();
      activePopupRef.current = null;
    }
  };

  // Render Place Markers
  const renderPlaceMarkers = (map: maplibregl.Map) => {
    placeMarkersRef.current.forEach(m => m.remove());
    placeMarkersRef.current = [];

    places.forEach(place => {
      if (place.type === 'capital' && !layers.cities) return;
      if (place.type === 'city' && !layers.cities) return;
      if (place.type === 'town' && !layers.towns) return;
      if (place.type === 'village' && !layers.villages) return;
      if (place.type === 'historical_site' && !layers.cities) return;

      const isSelected = selectedPlace?.id === place.id;
      const el = document.createElement('div');
      el.className = 'group cursor-pointer flex flex-col items-center';

      let iconSymbol = '●';
      let iconColor = 'bg-brass-amber text-parchment-100';
      let sizeClass = 'w-5 h-5 text-xs';

      if (place.type === 'capital') {
        iconSymbol = '★';
        iconColor = 'bg-amber-700 text-amber-100 ring-2 ring-amber-400';
        sizeClass = 'w-7 h-7 text-sm font-bold';
      } else if (place.type === 'city') {
        iconSymbol = '●';
        iconColor = 'bg-amber-900 text-amber-100';
        sizeClass = 'w-5 h-5 text-xs';
      } else if (place.type === 'historical_site') {
        iconSymbol = '◆';
        iconColor = 'bg-emerald-800 text-emerald-100';
        sizeClass = 'w-5 h-5 text-xs';
      }

      el.innerHTML = `
        <div class="${sizeClass} ${iconColor} rounded-full flex items-center justify-center shadow-md transition-transform transform ${isSelected ? 'scale-125 ring-4 ring-amber-500' : 'group-hover:scale-110'}">
          ${iconSymbol}
        </div>
        <span class="mt-1 px-1.5 py-0.5 rounded text-[11px] font-serif font-semibold bg-parchment-100/90 text-ink shadow border border-parchment-300 backdrop-blur whitespace-nowrap">
          ${place.name}
        </span>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        closeActivePopup();
        onSelectPlace(place);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([place.longitude, place.latitude])
        .addTo(map);

      placeMarkersRef.current.push(marker);
    });
  };

  // Render Event & Battle Markers with Parchment Popup & Auto-Focus
  const renderEventMarkers = (map: maplibregl.Map) => {
    eventMarkersRef.current.forEach(m => m.remove());
    eventMarkersRef.current = [];

    if (!layers.events) return;

    events.forEach(evt => {
      const el = document.createElement('div');
      el.className = 'group cursor-pointer flex flex-col items-center z-20';

      let eventIcon = '⚔️';
      if (evt.type === 'rebellion') eventIcon = '✊';
      if (evt.type === 'political event') eventIcon = '📜';
      if (evt.type === 'administrative change') eventIcon = '🏛️';

      el.innerHTML = `
        <div class="w-8 h-8 bg-red-950 text-amber-200 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-400 text-sm transition-transform transform group-hover:scale-125">
          ${eventIcon}
        </div>
        <span class="mt-1 px-2 py-0.5 rounded text-[10px] font-serif font-bold bg-red-950/95 text-amber-200 border border-amber-500/60 shadow whitespace-nowrap">
          ${evt.name} (${evt.year})
        </span>
      `;

      // Event Marker Click Event - Focus Camera & Display Parchment Card Popup
      el.addEventListener('click', (e) => {
        e.stopPropagation();

        // 1. Fly to Event Location
        map.flyTo({
          center: [evt.longitude, evt.latitude],
          zoom: 8.5,
          essential: true,
          duration: 1200
        });

        // 2. Remove Existing Popup
        if (activePopupRef.current) {
          activePopupRef.current.remove();
        }

        // 3. Create Custom Parchment Popup Card
        const popupContent = `
          <div style="background-color: #f7f2e6; color: #241e17; border: 2px solid #8b3a0f; border-radius: 10px; padding: 14px; max-width: 280px; font-family: 'Plus Jakarta Sans', sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.3);">
            <div style="display: flex; items-center; justify-content: space-between; border-bottom: 1px solid #d8cdb8; padding-bottom: 6px; margin-bottom: 8px;">
              <span style="font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #8b3a0f; font-family: 'Cinzel', serif;">
                ${evt.type} • ${evt.date}
              </span>
            </div>
            <h4 style="font-family: 'Cinzel', 'Playfair Display', serif; font-weight: 800; font-size: 15px; color: #241e17; margin: 0 0 6px 0; line-height: 1.2;">
              ${evt.name}
            </h4>
            <p style="font-size: 11px; color: #685e52; line-height: 1.5; margin: 0 0 10px 0;">
              ${evt.description}
            </p>
            <div style="background-color: #ede3d1; padding: 6px 8px; border-radius: 6px; border: 1px solid #d8cdb8; font-size: 10px; color: #5a3b2e; font-weight: 600;">
              📍 Coordinates: ${evt.latitude.toFixed(4)}°N, ${evt.longitude.toFixed(4)}°E
            </div>
          </div>
        `;

        const popup = new maplibregl.Popup({
          offset: 20,
          closeButton: false,
          className: 'parchment-event-popup'
        })
          .setLngLat([evt.longitude, evt.latitude])
          .setHTML(popupContent)
          .addTo(map);

        const popupElement = popup.getElement();
        popupElement.style.zIndex = '50';
        activePopupRef.current = popup;
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([evt.longitude, evt.latitude])
        .addTo(map);

      eventMarkersRef.current.push(marker);
    });
  };

  // Toggle Boundary & District Layer Visibility
  useEffect(() => {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;
    const boundaryVisibility = layers.boundary ? 'visible' : 'none';
    if (mapRef.current.getLayer('bengal-boundary-fill')) {
      mapRef.current.setLayoutProperty('bengal-boundary-fill', 'visibility', boundaryVisibility);
      mapRef.current.setLayoutProperty('bengal-boundary-line', 'visibility', boundaryVisibility);
    }

    const districtVisibility = layers.districts ? 'visible' : 'none';
    if (mapRef.current.getLayer('districts-fill')) {
      mapRef.current.setLayoutProperty('districts-fill', 'visibility', districtVisibility);
      mapRef.current.setLayoutProperty('districts-line', 'visibility', districtVisibility);
    }
  }, [layers.boundary, layers.districts]);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="hidden lg:flex absolute top-4 left-4 z-10 bg-parchment-100/95 backdrop-blur px-3 py-1.5 rounded-lg border border-parchment-300 shadow text-xs font-serif font-semibold text-ink items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-brass-amber animate-pulse"></span>
        Bengal — c. 1905 Setting
      </div>
    </div>
  );
};
