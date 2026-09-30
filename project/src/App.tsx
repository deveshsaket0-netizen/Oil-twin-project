import { useState, useEffect } from 'react';
import { TwinProvider } from '@/lib/twin-context';
import LoadingScreen from '@/components/LoadingScreen';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Underground from '@/components/Underground';
import Analytics from '@/components/Analytics';
import Simulator from '@/components/Simulator';
import LiveField from '@/components/LiveField';
import Impact from '@/components/Impact';
import AICopilot from '@/components/AICopilot';
import Footer from '@/components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [loaded]);

  return (
    <TwinProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div className="relative bg-base-black min-h-screen">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-3 focus:py-2 focus:bg-base-800 focus:text-oil-300 font-mono text-xs"
        >
          Skip to content
        </a>
        <NavBar />
        <main>
          <Hero />
          <Underground />
          <Analytics />
          <Simulator />
          <LiveField />
          <Impact />
        </main>
        <Footer />
        <AICopilot />
      </div>
    </TwinProvider>
  );
}
