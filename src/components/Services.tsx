import { useState } from "react";
import { cn } from "../utils/cn";
import { SERVICES, type ServiceId } from "../lib/data";
import { Eyebrow, GoldButton, Icon, Reveal } from "./ui";

export default function Services({ onQuote }: { onQuote: (s: ServiceId) => void }) {
  const [activeId, setActiveId] = useState<ServiceId>("construccion");
  const active = SERVICES.find((s) => s.id === activeId)!;

  return (
    <section id="servicios" className="relative scroll-mt-20 bg-cream text-ink">
      <div className="bg-blueprint-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        {/* Cabecera + tarjetas-selector */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-10">
          <Reveal>
            <Eyebrow>Nuestros servicios</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.12] sm:text-5xl">
              Soluciones integrales
              <br />
              para cada <em className="gold-ink font-semibold">necesidad.</em>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-mute">
              Tres especialidades, un solo responsable. Elige un servicio para
              conocer el alcance, o pídenos una propuesta que los combine.
            </p>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 120} className="h-full">
                <button
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  aria-pressed={activeId === s.id}
                  className={cn(
                    "group relative flex h-full w-full flex-col items-start gap-4 p-7 text-left transition-all duration-400",
                    activeId === s.id ? "bg-linen" : "bg-cream hover:bg-linen/70"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold to-brass transition-transform duration-500 origin-left",
                      activeId === s.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                    )}
                  />
                  <Icon name={s.icon} className="h-10 w-10 text-brass transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.4} />
                  <span>
                    <span className="block text-[15.5px] font-bold">{s.name}</span>
                    <span className="mt-2 block text-[13px] leading-relaxed text-mute">
                      {s.short}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-auto flex items-center gap-1.5 pt-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
                      activeId === s.id ? "text-brass" : "text-mute/60 group-hover:text-brass"
                    )}
                  >
                    {activeId === s.id ? "En pantalla" : "Ver detalle"}
                    <Icon name="arrowRight" className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Panel de detalle */}
        <Reveal delay={120} className="mt-12">
          <div
            key={active.id}
            className="grid animate-fade overflow-hidden rounded-2xl border border-sand bg-linen shadow-card lg:grid-cols-2"
          >
            {/* Imagen */}
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-[440px]">
              <img src={active.image} alt={active.name} className="img-cover absolute inset-0 transition-transform duration-[1600ms] hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <span className="absolute left-7 top-5 font-display text-7xl font-semibold text-linen/25">
                {active.num}
              </span>
              <div className="absolute bottom-6 left-7 flex items-center gap-4 rounded-xl border border-gold/30 bg-ink/70 px-5 py-3.5 backdrop-blur">
                <span className="font-display text-3xl text-goldsoft">{active.stat.value}</span>
                <span className="max-w-[110px] text-[11px] font-semibold uppercase tracking-[0.14em] leading-snug text-cream/85">
                  {active.stat.label}
                </span>
              </div>
            </div>

            {/* Contenido */}
            <div className="flex flex-col p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brass">
                {active.tagline}
              </p>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl">{active.name}</h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-mute">
                {active.description}
              </p>

              <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {active.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[13.5px] font-medium text-ink/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-brass">
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-5 border-t border-sand pt-7">
                <GoldButton onClick={() => onQuote(active.id)}>
                  Cotizar este servicio
                </GoldButton>
                <a
                  href="#contacto"
                  className="group flex items-center gap-2 text-sm font-bold text-brass transition-colors hover:text-ink"
                >
                  Hablar con un asesor
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
