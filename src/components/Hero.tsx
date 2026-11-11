import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { IMG } from "../lib/data";
import { GoldButton, Icon } from "./ui";

const SLIDES = [
  { image: IMG.hero[0], tag: "Residencial · Valle de Bravo", name: "Residencia Aurora" },
  { image: IMG.hero[1], tag: "Residencial · Riviera Maya", name: "Villa Alba" },
  { image: IMG.hero[2], tag: "Residencial · Ciudad de México", name: "Casas Loma Alta" },
];

const DURATION = 7000;

export default function Hero({ onVideo, onQuote }: { onVideo: () => void; onQuote: () => void }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(t);
  }, [index, paused]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Diapositivas */}
      {SLIDES.map((s, i) => (
        <div
          key={s.name}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-out",
            i === index ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={s.image}
            alt={i === index ? `${s.name} — proyecto de EDIFICA` : ""}
            className={cn("img-cover", i === index && "animate-kenburns")}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
          />
        </div>
      ))}

      {/* Veladuras */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/62 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/45" />
      <div className="bg-blueprint-dark absolute inset-0 opacity-40 [mask-image:linear-gradient(to_right,black,transparent_55%)]" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-40 pt-36 sm:px-8 lg:pb-44">
        <p className="animate-rise flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.4em] text-goldsoft sm:text-xs [animation-delay:150ms]">
          <span className="h-px w-10 bg-gold" />
          Construcción · Mantenimiento · Diseño Arquitectónico
        </p>

        <h1 className="text-shadow-hero mt-6 max-w-3xl animate-rise font-display text-[2.7rem] leading-[1.06] text-linen [animation-delay:300ms] sm:text-6xl lg:text-7xl">
          Creamos espacios
          <br />
          que construyen
          <br />
          <em className="gold-ink font-semibold italic">mejores historias.</em>
        </h1>

        <p className="mt-7 max-w-md animate-rise text-[15px] leading-relaxed text-cream/85 [animation-delay:450ms] sm:text-base">
          Soluciones integrales para tus proyectos, con calidad, diseño y
          compromiso en cada detalle.
        </p>

        <div className="mt-10 flex animate-rise flex-wrap items-center gap-5 [animation-delay:600ms]">
          <GoldButton href="#servicios">Descubrir nuestros servicios</GoldButton>
          <button
            type="button"
            onClick={onVideo}
            className="group flex items-center gap-3.5 text-sm font-semibold text-cream transition-colors hover:text-goldsoft"
          >
            <span className="relative flex h-13 w-13 items-center justify-center rounded-full border border-cream/40 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/15">
              <span className="absolute inset-0 rounded-full border border-gold/40 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
              <Icon name="play" className="ml-0.5 h-4.5 w-4.5 text-goldsoft" strokeWidth={1.4} />
            </span>
            Ver video
          </button>
        </div>
      </div>

      {/* Barra inferior del carrusel */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 pb-9 sm:px-8">
          {/* Proyecto destacado */}
          <div key={index} className="animate-fade hidden items-center gap-4 md:flex">
            <span className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                Proyecto destacado
              </p>
              <p className="mt-1 font-display text-lg text-linen">
                {SLIDES[index].name}
                <span className="ml-3 text-sm italic text-fog">{SLIDES[index].tag}</span>
              </p>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-5">
            <span className="font-display text-2xl text-linen">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="relative h-[2px] w-24 overflow-hidden rounded-full bg-cream/20 sm:w-32">
              <div
                key={`${index}-${paused}`}
                className="animate-progress h-full bg-gradient-to-r from-gold to-goldsoft"
                style={{
                  animationDuration: `${DURATION}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
            <span className="font-display text-2xl text-cream/45">
              {String(SLIDES.length).padStart(2, "0")}
            </span>
            <div className="ml-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Proyecto anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink active:scale-90"
              >
                <Icon name="chevronLeft" className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Proyecto siguiente"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink active:scale-90"
              >
                <Icon name="chevronRight" className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cinta diagonal dorada inferior */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-[5] hidden h-24 w-[38%] lg:block">
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/25 to-transparent [clip-path:polygon(0_35%,100%_100%,0_100%)]" />
      </div>

      {/* CTA flotante móvil */}
      <button
        type="button"
        onClick={onQuote}
        className="absolute bottom-28 right-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-goldsoft to-brass text-ink shadow-gold sm:hidden"
        aria-label="Solicitar cotización"
      >
        <Icon name="send" className="h-5 w-5" />
      </button>
    </section>
  );
}
