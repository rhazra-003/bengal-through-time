import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { WhoRuledHere } from '../components/WhoRuledHere';
import { SourceCitation } from '../components/SourceCitation';
import { Footer } from '../components/Footer';
import { PlaceImage } from '../components/PlaceImage';
import { MapPin, Landmark, ArrowLeft, Compass, ShieldCheck, Sparkles, Flame, BookOpen } from 'lucide-react';

export const PlaceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const place = slug ? dataService.getPlaceBySlug(slug) : undefined;

  if (!place) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-ink">Historical Place Not Found</h2>
        <p className="text-ink-muted text-sm max-w-md">
          The place entity "{slug}" could not be located in the 1905 Bengal historical dataset.
        </p>
        <Link
          to="/"
          className="bg-brass-amber text-parchment-100 font-serif font-bold px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors text-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Map
        </Link>
      </div>
    );
  }

  const district = dataService.getDistrictById(place.districtId);
  const division = dataService.getDivisionById(place.divisionId);
  const relatedPlaces = dataService.getPlacesByDistrict(place.districtId).filter(p => p.id !== place.id);

  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      
      {/* Top Header Bar */}
      <div className="bg-parchment-200 border-b border-parchment-300 py-4 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-serif font-semibold text-brass-amber hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Previous View
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-serif font-bold bg-brass-amber text-parchment-100 px-3 py-1.5 rounded-lg shadow hover:bg-amber-900 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" /> Explore on Map
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8">
        
        {/* Place Hero Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brass-amber bg-parchment-200 px-2.5 py-1 rounded border border-parchment-300">
              {place.type.replace('_', ' ')} • 1905
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" /> {place.confidence} Confidence
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink leading-tight">
            {place.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-ink-muted">
            <div>
              Modern Name: <strong className="text-ink font-semibold">{place.modernName}</strong>
            </div>
            <div>•</div>
            <div>
              1905 Status: <strong className="text-ink font-semibold">{place.historicalStatus}</strong>
            </div>
          </div>
        </div>

        {/* Historical Place Image */}
        <PlaceImage placeName={place.name} slug={place.slug} />

        {/* Administrative Details & Name Variants Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2 bg-parchment-200/70 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-base text-ink flex items-center gap-2 border-b border-parchment-300 pb-2">
              <Landmark className="w-4 h-4 text-brass-amber" />
              1905 Administrative Identity
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-ink-light text-[10px] uppercase tracking-wider block">Division</span>
                <span className="font-serif font-bold text-ink text-sm">{division?.name}</span>
                <p className="text-ink-muted text-[11px] mt-0.5">{division?.region}</p>
              </div>

              <div>
                <span className="text-ink-light text-[10px] uppercase tracking-wider block">District</span>
                <span className="font-serif font-bold text-ink text-sm">{district?.name}</span>
                <p className="text-ink-muted text-[11px] mt-0.5">HQ: {district?.headquarters}</p>
              </div>
            </div>
          </div>

          <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-5 shadow-sm space-y-2 text-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-light block">Name Variants</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="bg-parchment-300 px-2.5 py-1 rounded text-ink font-serif font-bold text-xs">{place.historicalName}</span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-1 rounded font-bold text-xs">{place.modernName}</span>
                {place.alternateNames.map(alt => (
                  <span key={alt} className="bg-parchment-100 border border-parchment-300 px-2 py-0.5 rounded text-ink-muted text-xs">{alt}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Famous Local Specialties & Cultural Heritage */}
        {place.famousSpecialties && (
          <section className="bg-amber-900/5 border border-amber-800/20 rounded-xl p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-brass-amber">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-ink">Famous Local Specialties & Cultural Heritage</h2>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed">
              {place.famousSpecialties}
            </p>
          </section>
        )}

        {/* Revolutionary & Battle Significance */}
        {place.revolutionarySignificance && (
          <section className="bg-red-950/5 border border-red-900/20 rounded-xl p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-lg text-red-900">
              <Flame className="w-5 h-5" />
              <h2 className="text-ink">Revolutionary & Battle Historical Significance</h2>
            </div>
            <p className="text-ink-muted text-sm leading-relaxed">
              {place.revolutionarySignificance}
            </p>
          </section>
        )}

        {/* Narrative Description */}
        <section className="bg-parchment-200/50 border border-parchment-300 rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="font-serif font-bold text-xl text-ink flex items-center gap-2">
            <Landmark className="w-5 h-5 text-brass-amber" />
            Historical Narrative
          </h2>
          <p className="text-ink-muted text-sm leading-relaxed whitespace-pre-line">
            {place.descriptionLong || place.descriptionShort}
          </p>
        </section>

        {/* Who Ruled Here? Political Timeline */}
        <WhoRuledHere politicalHistory={place.politicalHistory} placeName={place.name} />

        {/* Related Places in Same District */}
        {relatedPlaces.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-ink">
              Other Historical Places in {district?.name} District
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              {relatedPlaces.map(rel => (
                <Link
                  key={rel.id}
                  to={`/places/${rel.slug}`}
                  className="bg-parchment-200 hover:bg-parchment-300 border border-parchment-300 p-3.5 rounded-lg flex items-center justify-between transition-colors group"
                >
                  <div>
                    <div className="font-serif font-bold text-ink group-hover:text-brass-amber">{rel.name}</div>
                    <div className="text-[11px] text-ink-muted">Modern: {rel.modernName}</div>
                  </div>
                  <Compass className="w-4 h-4 text-brass-amber shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Traceable Sources & Footnotes */}
        <SourceCitation sources={place.sources} />

      </main>

      <Footer />
    </div>
  );
};
