import divisionsData from '../../../data/historical/1905/administrative-divisions.json';
import districtsData from '../../../data/historical/1905/districts.json';
import placesData from '../../../data/historical/1905/places.json';
import eventsData from '../../../data/historical/1905/events.json';
import politicalEntitiesData from '../../../data/historical/1905/political-entities.json';
import sourcesData from '../../../data/historical/1905/sources.json';
import boundaryGeoJSONRaw from '../../../data/historical/1905/boundaries/bengal-pre-partition.geojson?raw';
import districtsGeoJSONRaw from '../../../data/historical/1905/boundaries/districts.geojson?raw';

const boundaryGeoJSON = JSON.parse(boundaryGeoJSONRaw);
const districtsGeoJSON = JSON.parse(districtsGeoJSONRaw);

import {
  Place,
  District,
  AdministrativeDivision,
  HistoricalEvent,
  PoliticalEntity,
  Source
} from '../types';

export const dataService = {
  getDivisions(): AdministrativeDivision[] {
    return divisionsData as AdministrativeDivision[];
  },

  getDivisionById(id: string): AdministrativeDivision | undefined {
    return (divisionsData as AdministrativeDivision[]).find(d => d.id === id);
  },

  getDistricts(): District[] {
    return districtsData as District[];
  },

  getDistrictById(id: string): District | undefined {
    return (districtsData as District[]).find(d => d.id === id);
  },

  getPlaces(): Place[] {
    return placesData as Place[];
  },

  getPlaceBySlug(slug: string): Place | undefined {
    return (placesData as Place[]).find(p => p.slug === slug || p.id === slug);
  },

  getPlacesByDistrict(districtId: string): Place[] {
    return (placesData as Place[]).filter(p => p.districtId === districtId);
  },

  getEvents(): HistoricalEvent[] {
    return eventsData as HistoricalEvent[];
  },

  getPoliticalEntities(): PoliticalEntity[] {
    return politicalEntitiesData as PoliticalEntity[];
  },

  getSources(): Source[] {
    return sourcesData as Source[];
  },

  getSourceById(id: string): Source | undefined {
    return (sourcesData as Source[]).find(s => s.id === id);
  },

  getBoundaryGeoJSON(): any {
    return boundaryGeoJSON;
  },

  getDistrictsGeoJSON(): any {
    return districtsGeoJSON;
  },

  search(query: string): { places: Place[]; districts: District[]; events: HistoricalEvent[] } {
    const q = query.trim().toLowerCase();
    if (!q) return { places: [], districts: [], events: [] };

    const matchedPlaces = (placesData as Place[]).filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.modernName.toLowerCase().includes(q) ||
      p.alternateNames.some(alt => alt.toLowerCase().includes(q)) ||
      p.descriptionShort.toLowerCase().includes(q)
    );

    const matchedDistricts = (districtsData as District[]).filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.modernEquivalent.toLowerCase().includes(q)
    );

    const matchedEvents = (eventsData as HistoricalEvent[]).filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );

    return {
      places: matchedPlaces,
      districts: matchedDistricts,
      events: matchedEvents
    };
  }
};
