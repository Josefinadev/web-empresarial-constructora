import { IMG, PROCESS, STATS, VALUES } from "../lib/data";
import { useCountUp, useInView } from "../lib/hooks";
import { Eyebrow, Icon, Reveal } from "./ui";

function StatItem({
  value,
  prefix,
  suffix,
  label,
  active,
}: {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-8 text-center">
      <span className="font-display text-5xl font-semibold text-goldsoft sm:text-[3.4rem]">
        {prefix}
        {n}
        {suffix}
      </span>
      <span className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-cream/70">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const band = useInView<HTMLDivElement>(0.35);

  return (
    <>
      {/* ------------------------- Sobre nosotros ------------------------- */}
      <section id="nosotros" className="relative scroll-mt-20 overflow-hidden bg-cream text-ink">
        <div className="bg-blueprint-light absolute inset-0 [mask-image:linear-gradient(to_top,black,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            {/* Collage fotográfico */}
            <Reveal className="relative">
              <div className="relative mr-6 sm:mr-12">
                {/* Marco verde petróleo desplazado */}
                <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-gold/60 sm:-left-6 sm:-top-6" />
                {/* Triángulo decorativo */}
                <div className="absolute -left-8 -top-10 h-28 w-28 bg-gradient-to-br from-gold to-brass opacity-80 [clip-path:polygon(0_0,100%_0,0_100%)] sm:-left-12" />
                <div className="relative overflow-hidden rounded-2xl shadow-lift">
                  <img
                    src={IMG.aboutMain}
                    alt="Arquitecto de EDIFICA revisando planos de construcción"
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover transition-transform duration-[1800ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                </div>

                {/* Foto secundaria superpuesta */}
                <div className="absolute -bottom-10 -right-6 w-[46%] overflow-hidden rounded-xl border-[6px] border-cream shadow-lift sm:-right-12">
                  <img
                    src={IMG.aboutSmall}
                    alt="Ingeniero verificando planos en obra"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                {/* Insignia de experiencia */}
                <div className="animate-float absolute -top-7 right-4 flex h-27 w-27 flex-col items-center justify-center rounded-full bg-gradient-to-br from-goldsoft via-gold to-brass text-ink shadow-gold sm:right-8">
                  <span className="font-display text-3xl font-bold leading-none">+8</span>
                  <span className="mt-1 px-3 text-center text-[8.5px] font-extrabold uppercase leading-tight tracking-[0.14em]">
                    años de<br />experiencia
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Texto + valores */}
            <div>
              <Reveal>
                <Eyebrow>Sobre nosotros</Eyebrow>
                <h2 className="mt-5 font-display text-4xl leading-[1.12] sm:text-5xl">
                  Comprometidos con la
                  <br />
                  calidad y la <em className="gold-ink font-semibold">innovación.</em>
                </h2>
                <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-mute">
                  Somos una empresa dedicada a la construcción, el mantenimiento
                  y el diseño arquitectónico, enfocada en superar las
                  expectativas de nuestros clientes. Integramos arquitectura,
                  ingeniería y oficio en un solo equipo responsable de principio
                  a fin.
                </p>
              </Reveal>

              <div className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {VALUES.map((v, i) => (
                  <Reveal key={v.title} delay={i * 110}>
                    <div className="group flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/50 bg-linen text-brass transition-all duration-400 group-hover:bg-gold group-hover:text-ink group-hover:shadow-gold">
                        <Icon name={v.icon} className="h-5.5 w-5.5" strokeWidth={1.5} />
                      </span>
                      <span>
                        <span className="block text-[14.5px] font-bold">{v.title}</span>
                        <span className="mt-1 block text-[12.5px] leading-relaxed text-mute">
                          {v.text}
                        </span>
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200} className="mt-10">
                <a
                  href="#proceso"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream shadow-card transition-all duration-300 hover:bg-graphite hover:shadow-lift active:scale-[0.97]"
                >
                  Conocer más sobre nosotros
                  <Icon name="arrowRight" className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------- Cifras ------------------------- */}
      <div ref={band.ref} className="relative overflow-hidden border-y border-gold/20 bg-coal">
        <div className="bg-blueprint-dark absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(199_161_92/0.09),transparent_65%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gold/15 px-5 sm:grid-cols-2 sm:divide-y-0 sm:px-8 lg:grid-cols-4 lg:divide-x">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} active={band.visible} />
          ))}
          <div className="flex items-center justify-center px-8 py-8">
            <p className="text-center font-display text-[1.35rem] leading-snug text-cream">
              Construyendo <em className="gold-ink font-semibold">confianza</em>,
              <br />
              proyecto tras proyecto.
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------- Proceso ------------------------- */}
      <section id="proceso" className="relative scroll-mt-20 bg-linen text-ink">
        <div className="bg-blueprint-light absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-brass">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-brass" />
              Cómo trabajamos
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-brass" />
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.12] sm:text-[2.8rem]">
              Un proceso claro, <em className="gold-ink font-semibold">sin sorpresas.</em>
            </h2>
          </Reveal>

          <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {/* Línea conectora */}
            <div className="absolute left-[12%] right-[12%] top-9 hidden border-t-2 border-dashed border-gold/40 lg:block" />
            {PROCESS.map((p, i) => (
              <Reveal key={p.num} delay={i * 130}>
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-18 w-18 items-center justify-center rounded-full border-2 border-gold bg-linen text-brass shadow-card transition-all duration-400 group-hover:scale-105 group-hover:bg-gold group-hover:text-ink group-hover:shadow-gold">
                    <Icon name={p.icon} className="h-7 w-7" strokeWidth={1.5} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink font-display text-[11px] font-bold text-goldsoft">
                      {p.num}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.45rem]">{p.title}</h3>
                  <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-mute">
                    {p.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
