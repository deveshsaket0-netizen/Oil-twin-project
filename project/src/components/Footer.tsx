import { ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-base-black">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 border border-oil-400/50 rounded-sm rotate-45" />
            <div className="absolute inset-1 bg-oil-400/20 rounded-sm rotate-45" />
          </div>
          <span className="font-display font-bold text-xs tracking-[0.2em] text-steel-200">
            OIL<span className="text-oil-400"> TWIN</span>
          </span>
        </div>
        <p className="label-tag text-center">
          AI-Powered Digital Oilfield · Simulated Data · &copy; {new Date().getFullYear()}
        </p>
        <a
          href="#hero"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-steel-400 hover:text-oil-300 transition-colors"
        >
          Back to top <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
}
