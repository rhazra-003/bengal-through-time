import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-parchment-200 border-t border-parchment-300 text-ink py-10 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brass-amber flex items-center justify-center text-parchment-100 font-serif font-bold text-sm">
                B
              </div>
              <span className="font-serif font-bold text-base text-ink tracking-wider">
                BENGAL <span className="text-brass-amber">THROUGH TIME</span>
              </span>
            </div>
            <p className="text-ink-muted leading-relaxed max-w-md">
              An interactive historical atlas dedicated to reconstructing the historical geography, administrative boundaries, and political history of Bengal immediately before the Partition of 16 October 1905.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif font-bold text-ink uppercase tracking-wider text-xs mb-3 text-brass-amber">
              Exploration
            </h4>
            <ul className="space-y-2 text-ink-muted">
              <li>
                <Link to="/" className="hover:text-brass-amber transition-colors flex items-center gap-1.5">
                  Historical Map
                </Link>
              </li>
              <li>
                <Link to="/research/pre-partition" className="hover:text-brass-amber transition-colors">
                  Pre-Partition Boundary Scope
                </Link>
              </li>
              <li>
                <Link to="/research/partition" className="hover:text-brass-amber transition-colors">
                  The 1905 Partition & Revolutions
                </Link>
              </li>
              <li>
                <Link to="/then-vs-now" className="hover:text-brass-amber transition-colors">
                  Then vs Now Name Resolution
                </Link>
              </li>
              <li>
                <Link to="/how-to-use" className="hover:text-brass-amber transition-colors flex items-center gap-1.5">
                  How to Use Guide
                </Link>
              </li>
              <li>
                <Link to="/knowledge-check" className="hover:text-brass-amber transition-colors flex items-center gap-1.5">
                  Knowledge Check
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research & Legal */}
          <div>
            <h4 className="font-serif font-bold text-ink uppercase tracking-wider text-xs mb-3 text-brass-amber">
              Documentation
            </h4>
            <ul className="space-y-2 text-ink-muted">
              <li>
                <Link to="/sources" className="hover:text-brass-amber transition-colors flex items-center gap-1.5">
                  Sources & Bibliography
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brass-amber transition-colors">
                  Methodology & Disclaimer
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Credit & Disclaimer Bar */}
        <div className="pt-6 border-t border-parchment-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-ink-light text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brass-amber shrink-0" />
            <p>
              Historical Geography Notice: Boundaries represent 1905 administrative divisions under British India and do not correspond to modern national borders.
            </p>
          </div>
          <p className="font-medium text-ink">
            Made with passion by{' '}
            <a
              href="https://www.linkedin.com/in/algoridam003/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass-amber font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              Ridam Hazra <ExternalLink className="w-2.5 h-2.5" />
            </a>{' '}
            &{' '}
            <a
              href="https://antigravity.google/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brass-amber font-semibold hover:underline inline-flex items-center gap-0.5"
            >
              Antigravity <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
