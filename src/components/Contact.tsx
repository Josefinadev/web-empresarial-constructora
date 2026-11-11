import { useState } from "react";
import type { FormEvent } from "react";
import { cn } from "../utils/cn";
import { CONTACT, IMG, NAV_LINKS, SERVICES } from "../lib/data";
import { Eyebrow, GoldButton, Icon, Logo, Reveal } from "./ui";
import type { IconName } from "./ui";

/* ------------------------------ Banda CTA ------------------------------ */

export function CtaBand({ onQuote }: { onQuote: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${IMG.cta})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/78 to-ink/55" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-9 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:py-24">
        <Reveal>
          <div className="border-l-[3px] border-gold pl-6 sm:pl-8">
            <h2 className="font-display text-4xl leading-[1.15] text-linen sm:text-5xl">
              ¿Listo para hacer realidad
              <br />
              <em className="gold-ink font-semibold">tu próximo proyecto?</em>
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] text-cream/80">
              Cotiza en línea en menos de un minuto o agenda una visita técnica
              sin costo con nuestro equipo.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150} className="shrink-0">
          <GoldButton onClick={onQuote} className="px-9 py-4 text-[15px]">
            Solicitar una cotización
          </GoldButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Contacto ------------------------------ */

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
};

const EMPTY: FormState = { nombre: "", email: "", telefono: "", servicio: "", mensaje: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputCls = (err?: string) =>
  cn(
    "w-full rounded-lg border bg-linen px-4 py-3 text-sm font-medium text-ink placeholder:text-mute/60",
    "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40",
    err ? "border-danger/70 focus:border-danger" : "border-sand focus:border-gold"
  );

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-danger">
      <Icon name="alert" className="h-3.5 w-3.5" />
      {msg}
    </p>
  );
}

export function ContactSection({ onQuote }: { onQuote: () => void }) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<FormState> = {};
    if (form.nombre.trim().length < 3) errs.nombre = "Escribe tu nombre completo.";
    if (!EMAIL_RE.test(form.email)) errs.email = "Ingresa un correo válido.";
    if (form.telefono && form.telefono.replace(/\D/g, "").length < 8)
      errs.telefono = "El teléfono parece incompleto.";
    if (!form.servicio) errs.servicio = "Selecciona el servicio que necesitas.";
    if (form.mensaje.trim().length < 10)
      errs.mensaje = "Cuéntanos un poco más de tu proyecto (mín. 10 caracteres).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1400);
  };

  const infoRows: Array<{ icon: IconName; label: string; value: string; href?: string }> = [
    { icon: "phone", label: "Teléfono", value: CONTACT.phone, href: CONTACT.phoneHref },
    { icon: "mail", label: "Correo", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: "pin", label: "Oficina", value: CONTACT.address },
    { icon: "clock", label: "Horario", value: `${CONTACT.hours} · ${CONTACT.hoursSat}` },
  ];

  return (
    <section id="contacto" className="relative scroll-mt-20 bg-cream text-ink">
      <div className="bg-blueprint-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal className="max-w-2xl">
          <Eyebrow>Contacto</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[1.12] sm:text-5xl">
            Hablemos de <em className="gold-ink font-semibold">tu proyecto.</em>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-mute">
            Respuesta en menos de 24 horas hábiles. Si lo prefieres, usa nuestro
            cotizador en línea y recibe un rango de inversión al instante.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Tarjeta de información */}
          <Reveal delay={100}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink p-8 text-cream shadow-lift sm:p-9">
              <div className="bg-blueprint-dark absolute inset-0" />
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/12 blur-3xl" />
              <div className="relative">
                <h3 className="font-display text-2xl text-linen">
                  Atención <em className="gold-ink font-semibold">personalizada</em>
                </h3>
                <ul className="mt-8 space-y-6">
                  {infoRows.map((r) => (
                    <li key={r.label} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                        <Icon name={r.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span>
                        <span className="block text-[10.5px] font-bold uppercase tracking-[0.22em] text-fog">
                          {r.label}
                        </span>
                        {r.href ? (
                          <a href={r.href} className="mt-1 block text-[14.5px] font-semibold text-linen transition-colors hover:text-goldsoft">
                            {r.value}
                          </a>
                        ) : (
                          <span className="mt-1 block text-[14px] font-medium leading-relaxed text-cream/85">
                            {r.value}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-9 flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:brightness-110 hover:shadow-[0_12px_30px_-8px_rgb(34_193_94/0.6)] active:scale-[0.98]"
                >
                  <Icon name="whatsapp" className="h-4.5 w-4.5" />
                  Escríbenos por WhatsApp
                </a>
                <p className="mt-5 text-center text-[11.5px] leading-relaxed text-fog">
                  Cobertura: CDMX, Estado de México y proyectos foráneos bajo consulta.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal delay={180}>
            <div className="h-full rounded-2xl border border-sand bg-linen p-8 shadow-card sm:p-9">
              {status === "sent" ? (
                <div className="flex h-full animate-pop flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success">
                    <Icon name="check" className="h-9 w-9" strokeWidth={2.4} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl">
                    ¡Gracias, {form.nombre.split(" ")[0]}!
                  </h3>
                  <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-mute">
                    Recibimos tu mensaje sobre{" "}
                    <strong className="text-ink">
                      {SERVICES.find((s) => s.id === form.servicio)?.name ?? "tu proyecto"}
                    </strong>
                    . Un asesor te contactará en menos de 24 horas hábiles.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <GoldButton onClick={onQuote}>Cotizar mientras tanto</GoldButton>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(EMPTY);
                        setStatus("idle");
                      }}
                      className="text-sm font-bold text-brass transition-colors hover:text-ink"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-nombre" className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-mute">
                        Nombre completo *
                      </label>
                      <input
                        id="c-nombre"
                        type="text"
                        value={form.nombre}
                        onChange={(e) => set("nombre", e.target.value)}
                        placeholder="Ej. María González"
                        className={inputCls(errors.nombre)}
                      />
                      <FieldError msg={errors.nombre} />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-mute">
                        Correo electrónico *
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="tucorreo@ejemplo.com"
                        className={inputCls(errors.email)}
                      />
                      <FieldError msg={errors.email} />
                    </div>
                    <div>
                      <label htmlFor="c-tel" className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-mute">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        id="c-tel"
                        type="tel"
                        value={form.telefono}
                        onChange={(e) => set("telefono", e.target.value)}
                        placeholder="+52 55 0000 0000"
                        className={inputCls(errors.telefono)}
                      />
                      <FieldError msg={errors.telefono} />
                    </div>
                    <div>
                      <label htmlFor="c-servicio" className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-mute">
                        Servicio de interés *
                      </label>
                      <div className="relative">
                        <select
                          id="c-servicio"
                          value={form.servicio}
                          onChange={(e) => set("servicio", e.target.value)}
                          className={cn(inputCls(errors.servicio), "appearance-none pr-10", !form.servicio && "text-mute/60")}
                        >
                          <option value="" disabled>
                            Selecciona un servicio
                          </option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name}
                            </option>
                          ))}
                          <option value="integral">Proyecto integral (varios)</option>
                        </select>
                        <Icon
                          name="chevronRight"
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-brass"
                          strokeWidth={2.4}
                        />
                      </div>
                      <FieldError msg={errors.servicio} />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="c-mensaje" className="mb-2 block text-[10.5px] font-bold uppercase tracking-[0.2em] text-mute">
                        Cuéntanos de tu proyecto *
                      </label>
                      <textarea
                        id="c-mensaje"
                        rows={4}
                        value={form.mensaje}
                        onChange={(e) => set("mensaje", e.target.value)}
                        placeholder="Tipo de espacio, metros cuadrados aproximados, ubicación y fechas deseadas…"
                        className={cn(inputCls(errors.mensaje), "resize-none")}
                      />
                      <FieldError msg={errors.mensaje} />
                    </div>
                  </div>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
                    <p className="max-w-[260px] text-[11px] leading-relaxed text-mute">
                      Al enviar aceptas nuestro aviso de privacidad. Nunca
                      compartimos tus datos.
                    </p>
                    <GoldButton type="submit" icon={status === "sending" ? "clock" : "send"} disabled={status === "sending"}>
                      {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                    </GoldButton>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Footer ------------------------------ */

const SOCIALS: Array<{ icon: IconName; label: string }> = [
  { icon: "facebook", label: "Facebook" },
  { icon: "instagram", label: "Instagram" },
  { icon: "linkedin", label: "LinkedIn" },
  { icon: "youtube", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-ink">
      <div className="bg-blueprint-dark absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 pb-9 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-fog">
              Estudio de construcción, mantenimiento y diseño arquitectónico.
              Más de 8 años convirtiendo planos en espacios que perduran.
            </p>
            <div className="mt-7 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.icon}
                  href="#inicio"
                  aria-label={s.label}
                  onClick={(e) => e.preventDefault()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink hover:shadow-gold"
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Mapa del sitio">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">Navegación</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="group flex items-center gap-2 text-[13.5px] font-medium text-cream/75 transition-colors hover:text-goldsoft">
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3.5" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">Servicios</p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#servicios" className="group flex items-center gap-2 text-[13.5px] font-medium text-cream/75 transition-colors hover:text-goldsoft">
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3.5" />
                    {s.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="#proceso" className="group flex items-center gap-2 text-[13.5px] font-medium text-cream/75 transition-colors hover:text-goldsoft">
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3.5" />
                  Cómo trabajamos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">Contacto</p>
            <ul className="mt-5 space-y-4 text-[13.5px] text-cream/75">
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {CONTACT.address}
              </li>
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-3 transition-colors hover:text-goldsoft">
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-gold" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 transition-colors hover:text-goldsoft">
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-gold" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-cream/10 pt-7 sm:flex-row">
          <p className="text-[12px] text-fog">
            © {new Date().getFullYear()} EDIFICA Construcción & Diseño. Todos los derechos reservados.
          </p>
          <p className="font-display text-[15px] italic text-goldsoft">
            Diseñamos · Construimos · Cuidamos
          </p>
          <a
            href="#inicio"
            aria-label="Volver al inicio"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-gold"
          >
            <Icon name="arrowUp" className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
