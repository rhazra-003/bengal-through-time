import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Compass, BookOpen, Clock, Menu, X, Landmark, HelpCircle } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAboutModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onOpenAboutModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Historical Map', icon: Compass },
    { path: '/research/pre-partition', label: 'Pre-Partition Scope', icon: Landmark },
    { path: '/research/partition', label: '1905 Partition', icon: BookOpen },
    { path: '/then-vs-now', label: 'Then vs Now', icon: Clock },
    { path: '/how-to-use', label: 'How to Use', icon: HelpCircle },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-parchment-100/95 backdrop-blur border-b border-parchment-300 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-brass-amber flex items-center justify-center text-parchment-100 font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              B
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-ink block leading-none whitespace-nowrap">
                BENGAL <span className="text-brass-amber font-normal">THROUGH TIME</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-ink-muted block mt-1 whitespace-nowrap">
                Historical Atlas • c. 1905
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Broad Layout on Desktop */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3 lg:-translate-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link
                key={link.path}
                to={link.path}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs xl:text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-brass-amber text-parchment-100 shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-parchment-200'
                }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger & Mobile Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-parchment-200 hover:bg-parchment-300 text-ink-muted px-3 py-1.5 rounded-lg border border-parchment-300 text-xs transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-brass-amber" />
              <span className="hidden sm:inline">Search places, districts...</span>
              <kbd className="hidden md:inline-block bg-parchment-100 border border-parchment-300 px-1.5 py-0.5 rounded text-[10px] text-ink-light">
                ⌘K
              </kbd>
            </button>

            {onOpenAboutModal && (
              <button
                onClick={onOpenAboutModal}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-brass-amber border border-brass-amber/40 hover:bg-brass-amber hover:text-parchment-100 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                About Map
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink-muted hover:text-ink rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-parchment-100 border-b border-parchment-300 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold ${
                  active ? 'bg-brass-amber text-parchment-100' : 'text-ink-muted hover:bg-parchment-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
