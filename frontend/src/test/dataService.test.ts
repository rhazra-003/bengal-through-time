import { describe, it, expect } from 'vitest';
import { dataService } from '../services/dataService';

describe('DataService Dataset Integrity & Search Tests', () => {
  it('should load all 9 administrative divisions', () => {
    const divisions = dataService.getDivisions();
    expect(divisions).toHaveLength(9);
    const pres = dataService.getDivisionById('presidency');
    expect(pres).toBeDefined();
    expect(pres?.headquarters).toBe('Calcutta');
  });

  it('should retrieve districts and match division IDs', () => {
    const districts = dataService.getDistricts();
    expect(districts.length).toBeGreaterThanOrEqual(47);
    const calcutta = dataService.getDistrictById('calcutta');
    expect(calcutta).toBeDefined();
    expect(calcutta?.divisionId).toBe('presidency');
  });

  it('should retrieve places by slug and match required fields', () => {
    const place = dataService.getPlaceBySlug('calcutta');
    expect(place).toBeDefined();
    expect(place?.name).toBe('Calcutta');
    expect(place?.modernName).toBe('Kolkata');
    expect(place?.districtId).toBe('calcutta');
    expect(place?.sources.length).toBeGreaterThan(0);
  });

  it('should fuzzy match search queries for historical and modern names', () => {
    const res1 = dataService.search('Kolkata');
    expect(res1.places.some(p => p.name === 'Calcutta')).toBe(true);

    const res2 = dataService.search('Dhaka');
    expect(res2.places.some(p => p.name === 'Dacca')).toBe(true);

    const res3 = dataService.search('Plassey');
    expect(res3.places.some(p => p.id === 'plassey')).toBe(true);
  });
});
