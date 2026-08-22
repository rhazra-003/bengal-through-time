import React from 'react';
import { Footer } from '../components/Footer';
import { Landmark, Compass, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrePartitionResearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 flex-1 space-y-8 text-xs sm:text-sm">
        
        <div className="space-y-3">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <span className="text-xs uppercase font-bold tracking-widest text-brass-amber bg-parchment-200 px-3 py-1 rounded border border-parchment-300">
              Historical Scope Research
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" /> High Confidence Baseline
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink leading-tight">
            Territorial Scope of Pre-Partition Bengal (c. 1905)
          </h1>
          <p className="text-ink-muted leading-relaxed">
            Historical analysis of the Lieutenant-Governorship of Bengal prior to 16 October 1905, establishing its outer boundaries, 9 administrative divisions, 49 districts, and attached native states.
          </p>
        </div>

        <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-6 shadow-sm space-y-4 text-ink-muted leading-relaxed">
          
          <h2 className="font-serif font-bold text-lg text-ink">1. Executive Summary & Administrative Scope</h2>
          <p>
            Immediately prior to the Partition of Bengal taking effect on 16 October 1905, the <strong>Lieutenant-Governorship of Bengal</strong> was the most populous province in British India, governing over 78.49 million inhabitants across an area of ~189,837 sq miles (British territory) plus ~36,500 sq miles of Native Feudatory States.
          </p>
          <p>
            The administrative head was Lieutenant-Governor <strong>Sir Andrew Fraser</strong> (1903–1908), with the winter capital at <strong>Calcutta</strong> and summer capital at <strong>Darjeeling</strong>.
          </p>

          <h2 className="font-serif font-bold text-lg text-ink pt-4">2. The 9 Administrative Divisions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">1. Presidency Division (HQ: Calcutta)</h3>
              <p className="text-xs text-ink-light mt-1">Calcutta, 24-Parganas, Nadia, Murshidabad, Jessore, Khulna.</p>
            </div>
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">2. Burdwan Division (HQ: Burdwan)</h3>
              <p className="text-xs text-ink-light mt-1">Burdwan, Birbhum, Bankura, Midnapore, Hooghly, Howrah.</p>
            </div>
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">3. Rajshahi Division (HQ: Jalpaiguri)</h3>
              <p className="text-xs text-ink-light mt-1">Rajshahi, Dinajpur, Jalpaiguri, Darjeeling, Rangpur, Bogra, Pabna, Malda.</p>
            </div>
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">4. Dacca Division (HQ: Dacca)</h3>
              <p className="text-xs text-ink-light mt-1">Dacca, Mymensingh, Faridpur, Backergunge.</p>
            </div>
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">5. Chittagong Division (HQ: Chittagong)</h3>
              <p className="text-xs text-ink-light mt-1">Chittagong, Chittagong Hill Tracts, Noakhali, Tippera.</p>
            </div>
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">6. Patna Division (HQ: Patna)</h3>
              <p className="text-xs text-ink-light mt-1">Patna, Gaya, Shahabad, Saran, Champaran, Muzaffarpur, Darbhanga.</p>
            </div>
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">7. Bhagalpur Division (HQ: Bhagalpur)</h3>
              <p className="text-xs text-ink-light mt-1">Bhagalpur, Monghyr, Santal Parganas, Purnea.</p>
            </div>
            <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
              <h3 className="font-serif font-bold text-ink text-sm">8. Orissa Division (HQ: Cuttack)</h3>
              <p className="text-xs text-ink-light mt-1">Cuttack, Puri, Balasore, Angul, Sambalpur.</p>
            </div>
          </div>

          <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300 mt-4">
            <h3 className="font-serif font-bold text-ink text-sm">9. Chota Nagpur Division (HQ: Ranchi)</h3>
            <p className="text-xs text-ink-light mt-1">Hazaribagh, Ranchi, Palamau, Manbhum, Singbhum.</p>
          </div>

        </div>

        <div className="flex justify-between items-center pt-4">
          <Link
            to="/research/partition"
            className="inline-flex items-center gap-2 bg-brass-amber text-parchment-100 font-serif font-bold px-4 py-2 rounded-lg hover:bg-amber-900 transition-colors text-xs"
          >
            Read Next: The 1905 Partition Context →
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
};
