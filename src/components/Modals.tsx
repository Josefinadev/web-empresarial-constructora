import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { cn } from "../utils/cn";
import {
  CONTACT,
  EXTRAS,
  IMG,
  QUALITY_LEVELS,
  SERVICES,
  fmtMoney,
  type ExtraId,
  type QualityId,
  type ServiceId,
} from "../lib/data";
import { useAnimatedNumber } from "../lib/hooks";
import { GoldButton, Icon, Modal } from "./ui";

/* ============================ COTIZADOR ============================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function QuoteModal({
  open,
  onClose,
  initialService,
}: {
  open: boolean;
  onClose: () => void;
  initialService: ServiceId;
}) {
  const [service, setService] = useState<ServiceId>(initialService);
  const [m2, setM2] = useState(180);
  const [quality, setQuality] = useState<QualityId>("premium");
  const [extras, setExtras] = useState<Set<ExtraId>>(new Set(["planos"]));
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (open) {
      setService(initialService);
      setStatus("idle");
      setErrors({});
    }
  }, [open, initialService]);

  const svc = SERVICES.find((s) => s.id === service)!;
  const lvl = QUALITY_LEVELS.find((q) => q.id === quality)!;

  const calc = useMemo(() => {
    const base = svc.rate * m2;
    const extrasPct = EXTRAS.filter((e) => extras.has(e.id)).reduce((a, e) => a + e.pct, 0);
    const total = base * lvl.mult * (1 + extrasPct);
    let weeks = svc.weeksBase + Math.ceil(m2 / svc.m2PerWeek);
    if (extras.has("prioritaria")) weeks = Math.max(2, Math.ceil(weeks * 0.8));
    return {
      base,
      extrasPct,
      low: Math.round((total * 0.92) / 100) * 100,
      high: Math.round((total * 1.08) / 100) * 100,
      perM2: Math.round(total / m2),
      weeks,
    };
  }, [svc, m2, lvl, extras]);

  const animLow = useAnimatedNumber(calc.low);
  const animHigh = useAnimatedNumber(calc.high);

  const toggleExtra = (id: ExtraId) =>
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; contact?: string } = {};
    if (name.trim().length < 3) errs.name = "Escribe tu nombre.";
    const digits = contact.replace(/\D/g, "");
    if (!EMAIL_RE.test(contact) && digits.length < 8)
      errs.contact = "Ingresa un correo o teléfono válido.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1300);
  };

  const waSummary =
    `Hola EDIFICA, soy ${name || "un interesado"}. Cotizo ${svc.name} de ${m2} m², ` +
    `acabados ${lvl.label}` +
    (extras.size ? `, con ${EXTRAS.filter((e) => extras.has(e.id)).map((e) => e.label.toLowerCase()).join(", ")}` : "") +
    `. Rango estimado: ${fmtMoney(calc.low)} – ${fmtMoney(calc.high)} USD.`;

  const stepLabel = "mb-3 flex items-center gap-2.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-fog";
  const stepNum = "flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gold/15 font-display text-[11px] text-gold";

  return (
    <Modal open={open} onClose={onClose} size="xl" label="Cotizador de proyectos">
      {/* Encabezado */}
      <div className="border-b border-cream/10 px-7 pb-6 pt-8 sm:px-9">
        <p className="flex items-center gap-3 text-[10.5px] font-bold uppercase tracking-[0.3em] text-gold">
          <Icon name="sparkle" className="h-4 w-4" />
          Cotizador en línea
        </p>
        <h3 className="mt-2 font-display text-3xl text-linen">
          Cotiza tu proyecto <em className="gold-ink font-semibold">al instante.</em>
        </h3>
        <p className="mt-2 text-[13px] text-fog">
          Ajusta los parámetros y observa cómo cambia tu rango de inversión en tiempo real.
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* ------------------------- Controles ------------------------- */}
        <div className="space-y-8 px-7 py-8 sm:px-9">
          {/* Servicio */}
          <div>
            <p className={stepLabel}><span className={stepNum}>1</span> Tipo de servicio</p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setService(s.id)}
                  aria-pressed={service === s.id}
                  className={cn(
                    "flex flex-col items-start gap-2.5 rounded-xl border p-4 text-left transition-all duration-300",
                    service === s.id
                      ? "border-gold bg-gold/12 shadow-[inset_0_0_0_1px_rgb(199_161_92/0.4)]"
                      : "border-cream/12 hover:border-gold/50 hover:bg-cream/5"
                  )}
                >
                  <Icon
                    name={s.icon}
                    className={cn("h-6 w-6", service === s.id ? "text-gold" : "text-fog")}
                    strokeWidth={1.5}
                  />
                  <span className={cn("text-[12.5px] font-bold leading-tight", service === s.id ? "text-goldsoft" : "text-cream/85")}>
                    {s.id === "mantenimiento" ? "Mantenimiento / Remodelación" : s.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Superficie */}
          <div>
            <div className="flex items-end justify-between">
              <p className={cn(stepLabel, "mb-0")}><span className={stepNum}>2</span> Superficie a intervenir</p>
              <p className="font-display text-3xl text-goldsoft">
                {m2} <span className="text-base text-fog">m²</span>
              </p>
            </div>
            <input
              type="range"
              min={20}
              max={1000}
              step={10}
              value={m2}
              onChange={(e) => setM2(Number(e.target.value))}
              aria-label="Superficie en metros cuadrados"
              className="range-gold mt-5 w-full"
              style={{ "--fill": `${((m2 - 20) / 980) * 100}%` } as CSSProperties}
            />
            <div className="mt-2 flex justify-between text-[10.5px] font-semibold text-fog/70">
              <span>20 m²</span>
              <span>500 m²</span>
              <span>1,000 m²</span>
            </div>
          </div>

          {/* Acabados */}
          <div>
            <p className={stepLabel}><span className={stepNum}>3</span> Nivel de acabados</p>
            <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-cream/12">
              {QUALITY_LEVELS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setQuality(q.id)}
                  aria-pressed={quality === q.id}
                  className={cn(
                    "px-3 py-3.5 text-[12.5px] font-bold transition-all duration-300",
                    quality === q.id
                      ? "bg-gradient-to-r from-goldsoft via-gold to-brass text-ink"
                      : "text-cream/75 hover:bg-cream/6 hover:text-goldsoft"
                  )}
                >
                  {q.label}
                </button>
              ))}
            </div>
            <p key={quality} className="mt-2.5 animate-fade text-[12px] italic text-fog">
              {lvl.hint}
            </p>
          </div>

          {/* Complementos */}
          <div>
            <p className={stepLabel}><span className={stepNum}>4</span> Complementos</p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {EXTRAS.map((e) => {
                const on = extras.has(e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggleExtra(e.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300",
                      on ? "border-gold/70 bg-gold/10" : "border-cream/12 hover:border-gold/40"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-300",
                        on ? "border-gold bg-gold text-ink" : "border-cream/30"
                      )}
                    >
                      {on && <Icon name="check" className="h-3 w-3" strokeWidth={3.2} />}
                    </span>
                    <span className={cn("flex-1 text-[12.5px] font-semibold leading-tight", on ? "text-cream" : "text-cream/75")}>
                      {e.label}
                    </span>
                    <span className={cn("text-[11px] font-bold", on ? "text-gold" : "text-fog/60")}>
                      +{Math.round(e.pct * 100)}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ------------------------- Resumen ------------------------- */}
        <div className="relative border-t border-cream/10 bg-graphite/70 lg:border-l lg:border-t-0">
          <div className="bg-blueprint-dark absolute inset-0 opacity-60" />
          <div className="relative flex h-full flex-col px-7 py-8 sm:px-8">
            {status === "sent" ? (
              <div className="flex flex-1 animate-pop flex-col items-center justify-center py-8 text-center">
                <span className="flex h-18 w-18 items-center justify-center rounded-full bg-success/15 text-success">
                  <Icon name="check" className="h-8 w-8" strokeWidth={2.4} />
                </span>
                <h4 className="mt-5 font-display text-2xl text-linen">
                  ¡Solicitud enviada{name ? `, ${name.split(" ")[0]}` : ""}!
                </h4>
                <p className="mt-3 text-[13px] leading-relaxed text-fog">
                  Un asesor preparará tu propuesta de{" "}
                  <strong className="text-cream">{svc.name.toLowerCase()}</strong> para{" "}
                  <strong className="text-cream">{m2} m²</strong> y te contactará en menos de 24 h hábiles.
                </p>
                <div className="mt-5 w-full rounded-xl border border-gold/30 bg-ink/50 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-fog">Tu rango estimado</p>
                  <p className="mt-1 font-display text-xl text-goldsoft">
                    {fmtMoney(calc.low)} – {fmtMoney(calc.high)} <span className="text-xs text-fog">USD</span>
                  </p>
                </div>
                <a
                  href={`https://wa.me/525548217390?text=${encodeURIComponent(waSummary)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-3.5 text-sm font-bold text-ink transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  <Icon name="whatsapp" className="h-4.5 w-4.5" />
                  Adelantar por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 text-[13px] font-bold text-fog transition-colors hover:text-goldsoft"
                >
                  Cerrar cotizador
                </button>
              </div>
            ) : (
              <>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.26em] text-fog">
                  Estimación preliminar
                </p>
                <p className="mt-3 font-display text-[1.7rem] leading-tight text-goldsoft sm:text-[2rem]">
                  {fmtMoney(Math.round(animLow / 100) * 100)}
                  <span className="mx-1.5 text-fog">–</span>
                  {fmtMoney(Math.round(animHigh / 100) * 100)}
                </p>
                <p className="mt-1.5 text-[12px] font-semibold text-fog">
                  USD · aprox. {fmtMoney(calc.perM2)}/m²
                </p>

                <div className="mt-6 space-y-2.5 border-t border-cream/10 pt-5 text-[12.5px]">
                  <div className="flex justify-between text-cream/80">
                    <span>Base · {svc.name}</span>
                    <span className="font-bold">{fmtMoney(calc.base)}</span>
                  </div>
                  <div className="flex justify-between text-cream/80">
                    <span>Acabados {lvl.label}</span>
                    <span className="font-bold">× {lvl.mult.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-cream/80">
                    <span>Complementos ({extras.size})</span>
                    <span className="font-bold">+ {Math.round(calc.extrasPct * 100)}%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gold/10 px-3.5 py-2.5 text-goldsoft">
                    <span className="flex items-center gap-2 font-semibold">
                      <Icon name="calendar" className="h-4 w-4" />
                      Plazo estimado
                    </span>
                    <span className="font-display text-lg">≈ {calc.weeks} semanas</span>
                  </div>
                </div>

                <p className="mt-4 flex items-start gap-2 text-[10.5px] leading-relaxed text-fog/80">
                  <Icon name="alert" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                  Rango referencial sin IVA. La propuesta final se ajusta tras la visita técnica gratuita.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-3.5" noValidate>
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((er) => ({ ...er, name: undefined }));
                      }}
                      placeholder="Tu nombre"
                      aria-label="Tu nombre"
                      className={cn(
                        "w-full rounded-lg border bg-ink/60 px-4 py-3 text-sm font-medium text-cream placeholder:text-fog/50 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all",
                        errors.name ? "border-danger/70" : "border-cream/15 focus:border-gold"
                      )}
                    />
                    {errors.name && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                        setErrors((er) => ({ ...er, contact: undefined }));
                      }}
                      placeholder="WhatsApp o correo electrónico"
                      aria-label="WhatsApp o correo electrónico"
                      className={cn(
                        "w-full rounded-lg border bg-ink/60 px-4 py-3 text-sm font-medium text-cream placeholder:text-fog/50 focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all",
                        errors.contact ? "border-danger/70" : "border-cream/15 focus:border-gold"
                      )}
                    />
                    {errors.contact && <p className="mt-1 text-[11px] font-semibold text-danger">{errors.contact}</p>}
                  </div>
                  <GoldButton
                    type="submit"
                    icon={status === "sending" ? "clock" : "send"}
                    disabled={status === "sending"}
                    className="w-full"
                  >
                    {status === "sending" ? "Enviando solicitud…" : "Solicitar propuesta formal"}
                  </GoldButton>
                  <p className="text-center text-[10.5px] text-fog/70">
                    Sin compromiso · Respuesta en menos de 24 h hábiles
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ============================ VIDEO ============================ */

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} size="video" label="Video corporativo de EDIFICA">
      {open && (
        <video
          src={IMG.video}
          poster={IMG.videoPoster}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        >
          Tu navegador no puede reproducir este video.{" "}
          <a href={CONTACT.whatsapp} className="text-gold underline">
            Contáctanos por WhatsApp
          </a>
          .
        </video>
      )}
    </Modal>
  );
}
