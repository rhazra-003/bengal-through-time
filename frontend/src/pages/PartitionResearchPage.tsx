import React from 'react';
import { Footer } from '../components/Footer';
import { BookOpen, ShieldCheck, Flame, Zap, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PartitionResearchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col">
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-10 flex-1 space-y-8 text-xs sm:text-sm">
        
        <div className="space-y-3">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <span className="text-xs uppercase font-bold tracking-widest text-brass-amber bg-parchment-200 px-3 py-1 rounded border border-parchment-300">
              1905 Partition & Revolution History
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" /> High Confidence Baseline
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-ink leading-tight">
            The Partition of Bengal (16 October 1905) & Revolutionary Movements
          </h1>
          <p className="text-ink-muted leading-relaxed">
            In-depth historical analysis of Lord Curzon's partition decree, administrative motives, the creation of Eastern Bengal & Assam, Swadeshi agitation, and the rise of armed secret revolutionary networks across Bengal.
          </p>
        </div>

        <div className="bg-parchment-200 border border-parchment-300 rounded-xl p-6 shadow-sm space-y-6 text-ink-muted leading-relaxed">
          
          {/* Section 1 */}
          <div>
            <h2 className="font-serif font-bold text-lg text-ink mb-2">1. Background & Imperial Strategy</h2>
            <p className="mb-2">
              On <strong>16 October 1905</strong>, Viceroy Lord Curzon enacted the Partition of Bengal. The Lieutenant-Governorship of Bengal—which encompassed over 78 million inhabitants across Bengal proper, Bihar, Orissa, and Chota Nagpur—was split into:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
                <h3 className="font-serif font-bold text-ink text-sm">Eastern Bengal and Assam (~31 Million)</h3>
                <p className="text-xs text-ink-light mt-1">
                  <strong>Capital: Dacca (Dhaka)</strong><br />
                  Encompassed Dacca, Chittagong, Rajshahi (excl. Darjeeling) divisions, Malda district, Hill Tippera, and Assam. Muslim-majority province.
                </p>
              </div>

              <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300">
                <h3 className="font-serif font-bold text-ink text-sm">Bengal (West Bengal, Bihar & Orissa) (~47 Million)</h3>
                <p className="text-xs text-ink-light mt-1">
                  <strong>Capital: Calcutta (Kolkata)</strong><br />
                  Encompassed Presidency, Burdwan, Patna, Bhagalpur, Orissa, and Chota Nagpur divisions, plus Darjeeling. Bengali speakers reduced to a minority behind Hindi and Oriya speakers.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Revolutionary Secret Societies */}
          <div className="border-t border-parchment-300 pt-5 space-y-3">
            <div className="flex items-center gap-2 text-brass-amber font-serif font-bold text-lg">
              <h2 className="text-ink">2. Revolutionary Movements & Secret Societies (1905–1911)</h2>
            </div>
            <p>
              The partition provoked explosive anti-colonial outrage. Beyond non-violent boycotts, young educated Bengalis turned to secret revolutionary societies (*Samitis*) dedicated to ending British rule through direct armed action and political assassinations.
            </p>

            <div className="space-y-4 pt-2">
              
              <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300 space-y-1">
                <h3 className="font-serif font-bold text-ink text-sm">Anushilan Samiti (Calcutta & Dhaka)</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Founded in Calcutta in 1902 by <strong>Pramathanath Mitra (P. Mitra)</strong>, <strong>Satish Chandra Basu</strong>, and <strong>Sri Aurobindo Ghose</strong>, inspired by Bankim Chandra Chattopadhyay's *Anandamath*. In November 1905, <strong>Pulin Behari Das</strong> established the <strong>Dhaka Anushilan Samiti</strong>, which rapidly expanded to over 500 secret branches across Dacca, Mymensingh, Faridpur, and Backergunge, training youth in physical martial arts (*Lathi-khela*), swordplay, and revolutionary ideology.
                </p>
              </div>

              <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300 space-y-1">
                <h3 className="font-serif font-bold text-ink text-sm">Jugantar Group & Underground Press</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Formed in 1906 as the radical inner circle of Anushilan by <strong>Barindra Kumar Ghosh</strong> (brother of Sri Aurobindo), <strong>Bhupendranath Datta</strong> (brother of Swami Vivekananda), and Abhinash Bhattacharya. They published the incendiary weekly journal <em>Jugantar</em> (New Era) and circulated Sri Aurobindo's manifesto <em>Bhavani Mandir</em> (Temple of the Goddess), which called for spiritual devotion to armed liberation.
                </p>
              </div>

              <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300 space-y-1">
                <h3 className="font-serif font-bold text-ink text-sm">Alipore Bomb Case (1908) & Muzaffarpur Bomb Outrage</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Barindra Ghosh set up a secret bomb laboratory and training camp at his garden house in <strong>Maniktala</strong>, Calcutta. Revolutionary chemist <strong>Hemchandra Kanungo (Das)</strong> traveled to Paris in 1906 to learn modern explosive techniques from Russian and European anarchists. On 30 April 1908, young revolutionaries <strong>Khudiram Bose</strong> (aged 18) and <strong>Prafulla Chaki</strong> attempted to assassinate oppressive Magistrate Douglas Kingsford in Muzaffarpur (Bihar). Prafulla Chaki martyred himself to evade capture, while Khudiram Bose was executed on 11 August 1908, becoming an immortal folk icon. The resulting <strong>Alipore Bomb Trial</strong> led to the acquittal of Sri Aurobindo (defended by C.R. Das) and lifetime exile for Barindra Ghosh to the Cellular Jail in the Andamans.
                </p>
              </div>

              <div className="bg-parchment-100 p-4 rounded-lg border border-parchment-300 space-y-1">
                <h3 className="font-serif font-bold text-ink text-sm">Bagha Jatin & Transnational Resistance</h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Following the arrests, <strong>Jatindranath Mukherjee (Bagha Jatin)</strong> assumed leadership of the Jugantar network, executing high-ranking colonial officials and organizing international arms smuggling networks during World War I (the Indo-German Conspiracy), culminating in the heroic battle of Balasore in 1915.
                </p>
              </div>

            </div>
          </div>

          {/* Section 3 */}
          <div className="border-t border-parchment-300 pt-5 space-y-2">
            <h2 className="font-serif font-bold text-lg text-ink">3. Swadeshi Agitation & Rakhi Bandhan</h2>
            <p>
              On 16 October 1905, <strong>Rabindranath Tagore</strong> initiated the <strong>Rakhi Bandhan</strong> ceremony, where thousands tied yellow threads on each other's wrists as a symbol of unshakeable Bengali unity between Hindus and Muslims. The Swadeshi movement spearheaded mass boycotts of British cloth and salt, promoting native chemical, handloom, and banking enterprises.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-t border-parchment-300 pt-5 space-y-2">
            <h2 className="font-serif font-bold text-lg text-ink">4. 1911 Annulment & Capital Transfer</h2>
            <p>
              Under mounting revolutionary pressure, King George V announced the <strong>annulment of the Partition</strong> at the Delhi Durbar on 12 December 1911. Bengali-speaking divisions were reunited into a single Bengal Presidency, while Bihar, Orissa, and Assam were separated. To distance the colonial government from revolutionary Calcutta, the imperial capital of British India was shifted to New Delhi.
            </p>
          </div>

        </div>

      </main>
      <Footer />
    </div>
  );
};
