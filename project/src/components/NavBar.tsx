import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// Order matches the on-page section order in App.tsx
const NAV_ITEMS = [
  { label: 'OVERVIEW', href: '#hero' },
  { label: 'DIGITAL TWIN', href: '#twin' },
  { label: 'AI ANALYTICS', href: '#analytics' },
  { label: 'SIMULATION', href: '#simulator' },
  { label: 'LIVE FIELD', href: '#field' },
  { label: 'IMPACT', href: '#impact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#hero');
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 60));

  // Highlight the section currently in view
  useEffect(() => {
    const els = NAV_ITEMS.map((i) => document.querySelector(i.href)).filter(
      (el): el is Element => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'bg-base-black/85 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 group" aria-label="OIL TWIN home">
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 border border-oil-400/50 rounded-sm rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
            <div className="absolute inset-1.5 bg-oil-400/20 rounded-sm rotate-45" />
          </div>
          <span className="font-display font-bold text-sm tracking-[0.2em] text-steel-100">
            OIL<span className="text-oil-400"> TWIN</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'true' : undefined}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
                  isActive ? 'text-oil-300' : 'text-steel-400 hover:text-oil-300'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 h-px bg-oil-400 transition-all duration-300 ${
                    isActive ? 'w-full left-0' : 'w-0 group-hover:w-full group-hover:left-0'
                  }`}
                />
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 glass-panel px-3 py-1.5 rounded-sm">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-status-green"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[9px] uppercase tracking-wider text-steel-300">LIVE SYSTEM</span>
          </div>
          <button
            type="button"
            className="lg:hidden p-2 text-steel-200 hover:text-oil-300 transition-colors"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden"
          >
            <ul className="px-6 pb-5 pt-1 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="border-t border-white/5">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block py-3 font-mono text-xs uppercase tracking-[0.2em] ${
                      active === item.href ? 'text-oil-300' : 'text-steel-300'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-oil-500 via-oil-300 to-accent-400"
        style={{ scaleX: progress }}
      />
    </motion.nav>
  );
}
