import { useEffect, useState } from "react";
import { cn } from "../utils/cn";
import { TESTIMONIALS } from "../lib/data";
import { Eyebrow, Icon, Reveal } from "./ui";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[index];

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      7500
    );
    return () => clearTimeout(timer);
  }, [index, paused]);

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      id="testimonios"
      className="relative scroll-mt-20 overflow-hidden bg-cream text-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -right-24 top-10 font-display text-[22rem] leading-none text-gold/10 select-none">
        ”
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>Testimonios</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.12] sm:text-5xl">
              Lo que dicen
              <br />
              <em className="gold-ink font-semibold">nuestros clientes.</em>
            </h2>
            <div className="mt-7 flex items-center gap-4">
              <span className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className="h-5 w-5" />
                ))}
              </span>
              <span className="text-sm font-bold">4.9 / 5</span>
              <span className="text-sm text-mute">· 60+ reseñas verificadas</span>
            </div>
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-mute">
              La mejor medida de nuestro trabajo es la tranquilidad de quien nos
              confía su patrimonio.
            </p>

            <div className="mt-9 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Testimonio anterior"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/50 text-brass transition-all duration-300 hover:bg-gold hover:text-ink hover:border-gold active:scale-90"
              >
                <Icon name="chevronLeft" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Testimonio siguiente"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/50 text-brass transition-all duration-300 hover:bg-gold hover:text-ink hover:border-gold active:scale-90"
              >
                <Icon name="chevronRight" className="h-5 w-5" />
              </button>
              <div className="ml-4 flex items-center gap-2">
                {TESTIMONIALS.map((item, i) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Ver testimonio de ${item.name}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-400",
                      i === index ? "w-7 bg-brass" : "w-2 bg-brass/30 hover:bg-brass/60"
                    )}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <figure
              key={index}
              className="relative animate-pop rounded-2xl border border-sand bg-linen p-8 shadow-card sm:p-11"
            >
              <span className="absolute -top-5 left-8 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-goldsoft to-brass text-ink shadow-gold">
                <Icon name="quote" className="h-5.5 w-5.5" />
              </span>
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-5 font-display text-[1.35rem] leading-relaxed text-ink/90 sm:text-[1.5rem]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-sand pt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-13 w-13 rounded-full object-cover ring-2 ring-gold ring-offset-2 ring-offset-linen"
                />
                <div>
                  <p className="text-[15px] font-bold">{t.name}</p>
                  <p className="mt-0.5 text-[12.5px] font-medium text-mute">{t.role}</p>
                </div>
                <span className="ml-auto hidden items-center gap-1.5 rounded-full bg-success/12 px-3 py-1.5 text-[11px] font-bold text-success sm:flex">
                  <Icon name="shield" className="h-3.5 w-3.5" />
                  Cliente verificado
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
