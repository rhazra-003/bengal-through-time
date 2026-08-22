export type PlaceType = 'city' | 'town' | 'village' | 'historical_site' | 'capital';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNCERTAIN';

export interface PlaceSourceLink {
  sourceId: string;
  pages?: string;
  citation?: string;
}

export interface PoliticalControlEntry {
  period: string;
  ruler: string;
  periodDetails?: string;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  historicalName: string;
  modernName: string;
  alternateNames: string[];
  type: PlaceType;
  latitude: number;
  longitude: number;
  divisionId: string;
  districtId: string;
  historicalStatus: string;
  descriptionShort: string;
  descriptionLong: string;
  famousSpecialties?: string;
  revolutionarySignificance?: string;
  politicalHistory: PoliticalControlEntry[];
  sources: PlaceSourceLink[];
  confidence: ConfidenceLevel;
  wikidataId?: string;
  geoNamesId?: string;
}

export interface AdministrativeDivision {
  id: string;
  name: string;
  historicalName: string;
  headquarters: string;
  region: string;
  areaSqMiles: number;
  population1901: number;
  districts: string[];
  description: string;
}

export interface District {
  id: string;
  name: string;
  historicalName: string;
  modernEquivalent: string;
  divisionId: string;
  headquarters: string;
  areaSqMiles: number;
  population1901: number;
  confidence: ConfidenceLevel;
  sources: string[];
}

export interface HistoricalEvent {
  id: string;
  name: string;
  date: string;
  year: number;
  type: 'battle' | 'rebellion' | 'treaty' | 'administrative change' | 'political event' | 'cultural event';
  placeId?: string;
  districtId?: string;
  latitude: number;
  longitude: number;
  description: string;
  sources: string[];
}

export interface PoliticalEntity {
  id: string;
  name: string;
  period: string;
  capital: string;
  description: string;
}

export interface Source {
  id: string;
  title: string;
  author: string;
  publicationYear: number;
  publisher?: string;
  type: string;
  url?: string;
  citation: string;
  notes?: string;
}

export interface MapLayersState {
  boundary: boolean;
  districts: boolean;
  cities: boolean;
  towns: boolean;
  villages: boolean;
  events: boolean;
}
