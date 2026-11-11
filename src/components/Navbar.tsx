import { useState } from "react";
import { cn } from "../utils/cn";
import { CONTACT, NAV_LINKS } from "../lib/data";
import { useBodyLock, useScroll, useScrollSpy } from "../lib/hooks";
import { GoldButton, Icon, Logo } from "./ui";

const IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar({ onQuote }: { onQuote: () => void }) {
  const { y, progress } = useScroll();
  const active = useScrollSpy(IDS);
  const [open, setOpen] = useState(false);
  useBodyLock(open);

  const solid = y > 50 || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          solid
            ? "border-b border-gold/15 bg-ink/92 shadow-[0_10px_40px_-18px_rgb(0_0_0/0.8)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent"
        )}
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href="#inicio" aria-label="EDIFICA — Inicio" className="transition-opacity hover:opacity-85">
            <Logo />
          </a>

          {/* Enlaces escritorio */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={cn(
                  "group relative py-2 text-[13.5px] font-semibold tracking-wide transition-colors",
                  active === l.id ? "text-goldsoft" : "text-cream/80 hover:text-linen"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-gold to-brass transition-all duration-400",
                    active === l.id ? "w-full" : "w-0 group-hover:w-1/2"
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <GoldButton onClick={onQuote} className="hidden px-6 py-3 text-[13px] sm:inline-flex">
              Solicitar Cotización
            </GoldButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-goldsoft transition-colors hover:bg-gold/10 lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Barra de progreso de lectura */}
        <div className="absolute inset-x-0 bottom-[-2px] h-[2px] bg-transparent">
          <div
            className="h-full bg-gradient-to-r from-brass via-gold to-goldsoft transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={cn(
          "fixed inset-0 z-[65] flex flex-col bg-ink/97 pt-[76px] backdrop-blur-2xl transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="bg-blueprint-dark flex-1 overflow-y-auto scroll-slim px-7 pb-10 pt-8">
          <nav className="flex flex-col" aria-label="Menú móvil">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                className={cn(
                  "flex items-center justify-between border-b border-cream/10 py-5 font-display text-3xl transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                  active === l.id ? "text-goldsoft italic" : "text-cream"
                )}
              >
                {l.label}
                <Icon name="arrowUpRight" className="h-5 w-5 text-gold/60" />
              </a>
            ))}
          </nav>
          <div className="mt-9 flex flex-col gap-4">
            <GoldButton
              onClick={() => {
                setOpen(false);
                onQuote();
              }}
              className="w-full"
            >
              Solicitar Cotización
            </GoldButton>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center justify-center gap-2.5 py-2 text-sm font-semibold text-fog transition-colors hover:text-goldsoft"
            >
              <Icon name="phone" className="h-4 w-4 text-gold" />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
