import { useCallback, useState } from "react";
import { cn } from "./utils/cn";
import { CONTACT, type ServiceId } from "./lib/data";
import { useScroll } from "./lib/hooks";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import { ContactSection, CtaBand, Footer } from "./components/Contact";
import { QuoteModal, VideoModal } from "./components/Modals";
import { Icon } from "./components/ui";

function FloatingActions() {
  const { y } = useScroll();
  const showTop = y > 700;
  return (
    <div className="fixed bottom-6 right-5 z-[60] flex flex-col items-center gap-3 sm:right-6">
      <a
        href="#inicio"
        aria-label="Volver arriba"
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ink/85 text-goldsoft shadow-lift backdrop-blur transition-all duration-500 hover:bg-gold hover:text-ink",
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <Icon name="arrowUp" className="h-4.5 w-4.5" />
      </a>
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-wa text-ink shadow-[0_14px_34px_-8px_rgb(34_193_94/0.65)] transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-wa/50 [animation-duration:2.6s]" />
        <Icon name="whatsapp" className="relative h-6.5 w-6.5" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-gold/30 bg-ink/90 px-4 py-2 text-[11.5px] font-bold text-cream opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 sm:block">
          ¿Dudas? Escríbenos
        </span>
      </a>
    </div>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState<ServiceId>("construccion");
  const [videoOpen, setVideoOpen] = useState(false);

  const openQuote = useCallback((s?: ServiceId) => {
    if (s) setQuoteService(s);
    setQuoteOpen(true);
  }, []);

  const closeQuote = useCallback(() => setQuoteOpen(false), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  return (
    <div className="grain min-h-screen bg-ink font-sans text-cream antialiased">
      <Navbar onQuote={() => openQuote()} />
      <main>
        <Hero onVideo={() => setVideoOpen(true)} onQuote={() => openQuote()} />
        <Services onQuote={openQuote} />
        <Projects onQuote={openQuote} />
        <About />
        <Testimonials />
        <CtaBand onQuote={() => openQuote()} />
        <ContactSection onQuote={() => openQuote()} />
      </main>
      <Footer />

      <FloatingActions />
      <QuoteModal open={quoteOpen} onClose={closeQuote} initialService={quoteService} />
      <VideoModal open={videoOpen} onClose={closeVideo} />
    </div>
  );
}
