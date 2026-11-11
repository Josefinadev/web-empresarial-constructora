import { useEffect, useMemo, useState } from "react";
import { cn } from "../utils/cn";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  type Project,
  type ServiceId,
} from "../lib/data";
import { Eyebrow, GhostButton, GoldButton, Icon, Modal, Reveal } from "./ui";

type Filter = (typeof PROJECT_CATEGORIES)[number];

export default function Projects({ onQuote }: { onQuote: (s: ServiceId) => void }) {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );
  const visible = filter === "Todos" && !showAll ? filtered.slice(0, 3) : filtered;

  const countFor = (f: Filter) =>
    f === "Todos" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;

  const current: Project | null = lightbox === null ? null : visible[lightbox] ?? null;

  // Flechas del teclado dentro del lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, visible.length]);

  return (
    <section id="proyectos" className="relative scroll-mt-20 overflow-hidden bg-ink">
      {/* Textura de fondo */}
      <div className="bg-blueprint-dark absolute inset-0 opacity-70" />
      <div className="absolute -left-40 top-0 h-[560px] w-[560px] rounded-full bg-gold/6 blur-[130px]" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-graphite/60 to-transparent [clip-path:polygon(0_0,100%_0,55%_100%,0_100%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          {/* Columna izquierda */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow tone="light">Nuestros proyectos</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-[1.12] text-linen sm:text-5xl">
                Resultados que
                <br />
                reflejan <em className="gold-ink font-semibold">nuestro trabajo.</em>
              </h2>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fog">
                Cada obra es una carta de presentación. Explora una selección de
                proyectos entregados y descubre cómo los construimos.
              </p>
            </Reveal>

            {/* Filtros */}
            <Reveal delay={140} className="mt-9">
              <p className="mb-4 text-[10.5px] font-bold uppercase tracking-[0.3em] text-fog/70">
                Filtrar por tipo
              </p>
              <div className="flex flex-wrap gap-2.5">
                {PROJECT_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setFilter(c);
                      setLightbox(null);
                    }}
                    aria-pressed={filter === c}
                    className={cn(
                      "group flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-all duration-300",
                      filter === c
                        ? "border-gold bg-gold text-ink shadow-gold"
                        : "border-cream/20 text-cream/75 hover:border-gold/60 hover:text-goldsoft"
                    )}
                  >
                    {c}
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[10.5px] font-bold",
                        filter === c ? "bg-ink/15" : "bg-cream/10 text-fog"
                      )}
                    >
                      {countFor(c)}
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220} className="mt-10">
              {filter === "Todos" ? (
                <GhostButton
                  onClick={() => setShowAll((v) => !v)}
                  icon={showAll ? "arrowUp" : "arrowRight"}
                >
                  {showAll ? "Mostrar menos" : "Ver más proyectos"}
                </GhostButton>
              ) : (
                <p className="flex items-center gap-2.5 text-sm text-fog">
                  <Icon name="sparkle" className="h-4 w-4 text-gold" />
                  {visible.length}{" "}
                  {visible.length === 1 ? "proyecto" : "proyectos"} de {filter.toLowerCase()}
                </p>
              )}
            </Reveal>
          </div>

          {/* Galería */}
          <div className="grid gap-5 sm:grid-cols-2">
            {visible.map((p, i) => {
              const wide = i === 0 || (i === visible.length - 1 && (visible.length - 1) % 2 === 1);
              return (
                <Reveal key={p.id} delay={Math.min(i, 3) * 100} className={cn(wide && "sm:col-span-2")}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    className={cn(
                      "group relative block w-full overflow-hidden rounded-xl border border-cream/10 text-left transition-all duration-500 hover:border-gold/50 hover:shadow-lift",
                      wide ? "aspect-[16/8.2]" : "aspect-[4/3.1]"
                    )}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="img-cover absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                    <span className="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-goldsoft backdrop-blur">
                      {p.category}
                    </span>
                    <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-gold text-ink opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                      <Icon name="expand" className="h-4 w-4" strokeWidth={2.2} />
                    </span>

                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <span>
                        <span className="block font-display text-xl text-linen transition-colors group-hover:text-goldsoft sm:text-2xl">
                          {p.title}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-cream/70">
                          <Icon name="pin" className="h-3.5 w-3.5 text-gold" />
                          {p.location} · {p.year} · {p.area}
                        </span>
                      </span>
                      <span className="hidden h-px flex-1 max-w-16 bg-gradient-to-r from-gold/70 to-transparent sm:block" />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Modal open={current !== null} onClose={() => setLightbox(null)} size="xl" label="Detalle del proyecto">
        {current && (
          <div className="grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="relative min-h-[240px] md:min-h-[520px]">
              <img key={current.id} src={current.image} alt={current.title} className="img-cover absolute inset-0 animate-fade" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent md:bg-gradient-to-r" />
              <span className="absolute bottom-4 left-5 rounded-full bg-ink/70 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.2em] text-goldsoft backdrop-blur">
                {(lightbox ?? 0) + 1} / {visible.length}
              </span>
            </div>

            <div className="flex flex-col p-7 sm:p-9">
              <span className="w-fit rounded-full border border-gold/40 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.2em] text-gold">
                {current.category}
              </span>
              <h3 className="mt-4 font-display text-3xl text-linen">{current.title}</h3>
              <p className="mt-4 text-[13.5px] leading-relaxed text-fog">{current.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: "pin" as const, k: "Ubicación", v: current.location },
                  { icon: "calendar" as const, k: "Año", v: current.year },
                  { icon: "scan" as const, k: "Superficie", v: current.area },
                  { icon: "clock" as const, k: "Duración", v: current.duration },
                ].map((m) => (
                  <div key={m.k} className="rounded-lg border border-cream/10 bg-graphite/60 px-3.5 py-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-fog/80">
                      <Icon name={m.icon} className="h-3.5 w-3.5 text-gold" />
                      {m.k}
                    </p>
                    <p className="mt-1 text-[13.5px] font-bold text-cream">{m.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {current.tags.map((t) => (
                  <span key={t} className="rounded-full bg-gold/12 px-3 py-1 text-[11px] font-semibold text-goldsoft">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-cream/10 pt-6">
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    aria-label="Proyecto anterior"
                    onClick={() => setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-all hover:border-gold hover:text-gold"
                  >
                    <Icon name="chevronLeft" className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Proyecto siguiente"
                    onClick={() => setLightbox((i) => (i === null ? null : (i + 1) % visible.length))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-all hover:border-gold hover:text-gold"
                  >
                    <Icon name="chevronRight" className="h-4 w-4" />
                  </button>
                </div>
                <GoldButton
                  className="px-5 py-3 text-[12.5px]"
                  onClick={() => {
                    setLightbox(null);
                    onQuote(current.service);
                  }}
                >
                  Cotizar uno similar
                </GoldButton>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
