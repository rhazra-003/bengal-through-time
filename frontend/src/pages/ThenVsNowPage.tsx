import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { Footer } from '../components/Footer';
import { Search, ArrowRight, Compass, MapPin, Users } from 'lucide-react';

export const ThenVsNowPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const places = dataService.getPlaces();
  const districts = dataService.getDistricts();

  const filteredPlaces = places.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.modernName.toLowerCase().includes(query.toLowerCase()) ||
    p.alternateNames.some(alt => alt.toLowerCase().includes(query.toLowerCase()))
  );

  // Sorted from 1901 Population highest to lowest (descending)
  const filteredDistricts = districts
    .filter(d =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.modernEquivalent.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => b.population1901 - a.population1901);

  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex-1 space-y-8">
        
        {/* Header Title */}
        <div className="space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-brass-amber bg-parchment-200 px-3 py-1 rounded border border-parchment-300">
            Geographical Resolution • c. 1905 vs Present
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink">
            Then vs Now — Name Resolution Catalog
          </h1>
          <p className="text-ink-muted text-sm max-w-3xl leading-relaxed">
            Historical place names in colonial Bengal underwent multiple transliteration and official renamings across the pre-colonial, British Raj, and post-independence eras. Compare 1905 colonial official names with contemporary modern geography.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-brass-amber" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by Calcutta, Kolkata, Dacca, Dhaka, Backergunge..."
            className="w-full pl-10 pr-4 py-2.5 bg-parchment-200 border border-parchment-300 rounded-lg text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brass-amber font-serif"
          />
        </div>

        {/* Places Comparison Table */}
        <section className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-ink flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brass-amber" />
            <span>Settlement & City Name Comparison</span>
          </h2>

          <div className="bg-parchment-200 border border-parchment-300 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-parchment-300 text-ink font-serif font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">1905 Historical Name</th>
                    <th className="p-3.5">Modern Name</th>
                    <th className="p-3.5">1905 Status</th>
                    <th className="p-3.5">1905 District</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-parchment-300 text-ink-muted">
                  {filteredPlaces.map((place) => {
                    const dist = dataService.getDistrictById(place.districtId);
                    return (
                      <tr key={place.id} className="hover:bg-parchment-100/80 transition-colors">
                        <td className="p-3.5 font-serif font-bold text-ink text-sm">
                          {place.name}
                        </td>
                        <td className="p-3.5">
                          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded font-semibold text-xs">
                            {place.modernName}
                          </span>
                        </td>
                        <td className="p-3.5">{place.historicalStatus}</td>
                        <td className="p-3.5 font-serif">{dist?.name || place.districtId}</td>
                        <td className="p-3.5">
                          <Link
                            to={`/places/${place.slug}`}
                            className="inline-flex items-center gap-1 text-brass-amber hover:underline font-serif font-semibold text-xs"
                          >
                            Read History <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Districts Comparison Table (Sorted by Population Descending) */}
        <section className="space-y-4 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="font-serif font-bold text-xl text-ink flex items-center gap-2">
              <Compass className="w-5 h-5 text-brass-amber" />
              <span>1905 District Boundaries vs Modern Equivalents</span>
            </h2>
            <span className="text-xs font-serif text-ink-muted flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brass-amber" /> Sorted by 1901 Population (Highest to Lowest)
            </span>
          </div>

          <div className="bg-parchment-200 border border-parchment-300 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-parchment-300 text-ink font-serif font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3.5">1905 District Name</th>
                    <th className="p-3.5">Headquarters (1905)</th>
                    <th className="p-3.5">1901 Population ↓</th>
                    <th className="p-3.5">Modern Administrative Equivalent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-parchment-300 text-ink-muted">
                  {filteredDistricts.map((dist) => (
                    <tr key={dist.id} className="hover:bg-parchment-100/80 transition-colors">
                      <td className="p-3.5 font-serif font-bold text-ink text-sm">{dist.name}</td>
                      <td className="p-3.5 font-serif">{dist.headquarters}</td>
                      <td className="p-3.5 font-semibold text-brass-amber font-sans">
                        {dist.population1901.toLocaleString()}
                      </td>
                      <td className="p-3.5 font-medium text-ink">{dist.modernEquivalent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};
