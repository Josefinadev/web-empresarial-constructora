import type { CSSProperties, ReactElement, ReactNode } from "react";
import { cn } from "../utils/cn";
import { useBodyLock, useEscape, useInView } from "../lib/hooks";

/* ------------------------------- Iconos ------------------------------- */

export type IconName =
  | "hardhat"
  | "wrench"
  | "ruler"
  | "shield"
  | "handshake"
  | "clock"
  | "users"
  | "arrowRight"
  | "arrowUpRight"
  | "arrowUp"
  | "play"
  | "phone"
  | "mail"
  | "pin"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "close"
  | "chevronLeft"
  | "chevronRight"
  | "check"
  | "quote"
  | "star"
  | "menu"
  | "search"
  | "key"
  | "calendar"
  | "scan"
  | "expand"
  | "send"
  | "alert"
  | "sparkle";

const S: Record<string, ReactElement> = {
  hardhat: (
    <>
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a6 6 0 0 1 6-6" />
      <path d="M14 6a6 6 0 0 1 6 6v3" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  ruler: (
    <>
      <path d="M3 21V3l18 18H3Z" />
      <path d="M8 16.2v-4l4 4H8Z" />
      <path d="M3 8h2.4M3 13h2.4" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowUp: <path d="M12 20V4m-6 6 6-6 6 6" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  key: (
    <>
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </>
  ),
  calendar: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  scan: (
    <>
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M8 12h8M12 8v8" />
    </>
  ),
  expand: <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
  send: <path d="m22 2-7 20-4-9-9-4Zm0 0L11 13" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4m0 4h.01" />
    </>
  ),
  sparkle: (
    <path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" />
  ),
};

const F: Record<string, ReactElement> = {
  whatsapp: (
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  ),
  facebook: (
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  ),
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  ),
  youtube: (
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  ),
  instagram: (
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  ),
  quote: (
    <path d="M9.6 4C5.9 6.1 3.5 9.6 3.5 13.8c0 3.4 2 6.2 5 6.2 2.5 0 4.4-1.9 4.4-4.4 0-2.4-1.7-4.2-4-4.2-.4 0-.9.1-1 .1.3-2.3 2-4.7 4-5.9L9.6 4Zm10.4 0c-3.7 2.1-6.1 5.6-6.1 9.8 0 3.4 2 6.2 5 6.2 2.5 0 4.4-1.9 4.4-4.4 0-2.4-1.7-4.2-4-4.2-.4 0-.9.1-1 .1.3-2.3 2-4.7 4-5.9L20 4Z" />
  ),
  star: (
    <path d="M12 2.5l2.9 6.1 6.6.83-4.86 4.6 1.26 6.53L12 17.4l-5.9 3.16 1.26-6.53-4.86-4.6 6.6-.83L12 2.5z" />
  ),
};

export function Icon({
  name,
  className,
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const filled = F[name];
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("h-5 w-5 shrink-0", className)}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {filled ?? S[name]}
    </svg>
  );
}

/* ------------------------------- Logo ------------------------------- */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 26V13l5-3.5V26" />
      <path d="M12 26V6l7 4v16" />
      <path d="M21 26V13l6 3v10" />
      <path d="M3 26h26" />
      <path d="M15.5 12.5v2M15.5 17v2" opacity="0.7" />
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="h-10 w-10 text-gold" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans text-lg font-extrabold tracking-[0.32em]",
            dark ? "text-ink" : "text-linen"
          )}
        >
          EDIFICA
        </span>
        <span className="mt-1.5 text-[8.5px] font-semibold tracking-[0.34em] text-gold">
          CONSTRUCCIÓN · DISEÑO
        </span>
      </span>
    </span>
  );
}

/* ------------------------------ Reveal ------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ...style, ["--rv-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------ Eyebrow ------------------------------ */

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em]",
        tone === "dark" ? "text-brass" : "text-gold",
        className
      )}
    >
      {children}
      <span
        className={cn(
          "h-px w-14",
          tone === "dark"
            ? "bg-gradient-to-r from-brass to-transparent"
            : "bg-gradient-to-r from-gold to-transparent"
        )}
      />
    </p>
  );
}

/* ------------------------------ Botones ------------------------------ */

type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: IconName;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function GoldButton({ children, onClick, href, className, icon = "arrowRight", type = "button", disabled }: BtnProps) {
  const cls = cn(
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-full",
    "bg-gradient-to-r from-goldsoft via-gold to-brass text-ink",
    "px-7 py-3.5 text-sm font-bold tracking-wide",
    "shadow-gold transition-all duration-300",
    "hover:shadow-[0_16px_44px_-8px_rgb(199_161_92/0.75)] hover:brightness-110 active:scale-[0.97]",
    disabled && "pointer-events-none opacity-60",
    className
  );
  const inner = (
    <>
      {children}
      <Icon name={icon} className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.2} />
    </>
  );
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  );
}

export function GhostButton({ children, onClick, href, className, icon = "arrowRight" }: BtnProps) {
  const cls = cn(
    "group/btn inline-flex items-center justify-center gap-2.5 rounded-full",
    "border border-gold/50 px-7 py-3.5 text-sm font-semibold tracking-wide text-cream",
    "transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-goldsoft active:scale-[0.97]",
    className
  );
  const inner = (
    <>
      {children}
      <Icon name={icon} className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2} />
    </>
  );
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ------------------------------ Modal ------------------------------ */

export function Modal({
  open,
  onClose,
  children,
  size = "lg",
  label,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "md" | "lg" | "xl" | "video";
  label: string;
}) {
  useBodyLock(open);
  useEscape(open, onClose);
  if (!open) return null;

  const widths = {
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
    video: "max-w-5xl aspect-video p-0 overflow-hidden bg-black",
  } as const;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        className="absolute inset-0 animate-fade bg-ink/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full animate-pop rounded-2xl border border-gold/25 bg-coal shadow-lift",
          size !== "video" && "max-h-[92vh] overflow-y-auto scroll-slim",
          widths[size]
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-ink/60 text-cream/80 backdrop-blur transition-all hover:border-gold hover:text-gold"
        >
          <Icon name="close" className="h-4.5 w-4.5" />
        </button>
        {children}
      </div>
    </div>
  );
}
