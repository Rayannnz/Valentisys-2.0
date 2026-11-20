import type { CSSProperties, ReactNode } from "react";

/*
 * Two primitives that mirror Figma auto-layout, used only by the product
 * mockups (components/Mockups.tsx). They let a mockup be written with the same
 * numbers the Figma file has: direction, gap, padding, radius, fill, stroke.
 * Page sections do not use these; they have real classes in app/globals.css.
 */

/** A token name ("accent") becomes its CSS variable. Hex, rgba and gradients pass through. */
export const col = (v?: string) => (v && /^[a-z][a-z0-9-]*$/.test(v) ? `var(--${v})` : v);

type Pad = number | [number, number] | [number, number, number, number];
type Size = number | "fill";

type FrameProps = {
  /** direction: H is a row, V (default) is a column */
  d?: "H" | "V";
  g?: number;
  p?: Pad;
  /** cross-axis and main-axis alignment, in Figma's words */
  ai?: "MIN" | "CENTER" | "MAX";
  ji?: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
  r?: number;
  fill?: string;
  /** Figma strokes sit inside the box, so they are inset shadows, not borders */
  stroke?: string;
  sw?: number;
  edge?: "top" | "right" | "bottom" | "left";
  shadow?: "sm" | "md" | "lg" | "xl" | "accent";
  clip?: boolean;
  w?: Size;
  h?: Size;
  className?: string;
  style?: CSSProperties;
  /** how far, in px, the frame drifts with the pointer in the hero (wired by PageEffects) */
  parallax?: number;
  children?: ReactNode;
};

const ALIGN = { MIN: "flex-start", CENTER: "center", MAX: "flex-end", SPACE_BETWEEN: "space-between" };
const EDGE = { top: "0 1px 0", right: "-1px 0 0", bottom: "0 -1px 0", left: "1px 0 0" };

export function F({ d = "V", g, p, ai, ji, r, fill, stroke, sw = 1, edge, shadow, clip, w, h, className, style, parallax, children }: FrameProps) {
  const shadows = [
    shadow && `var(--shadow-${shadow})`,
    stroke && (edge ? `inset ${EDGE[edge]} ${col(stroke)}` : `inset 0 0 0 ${sw}px ${col(stroke)}`),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`fx ${d === "H" ? "fx-h" : "fx-v"}${className ? ` ${className}` : ""}`}
      data-w={w === "fill" ? "fill" : undefined}
      data-h={h === "fill" ? "fill" : undefined}
      data-parallax={parallax}
      style={{
        gap: g,
        padding: typeof p === "object" ? p.map((n) => `${n}px`).join(" ") : p,
        alignItems: ai && ALIGN[ai],
        justifyContent: ji && ALIGN[ji],
        borderRadius: r,
        background: col(fill),
        boxShadow: shadows || undefined,
        overflow: clip ? "hidden" : undefined,
        width: typeof w === "number" ? w : undefined,
        height: typeof h === "number" ? h : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type TextProps = {
  /** text style: ui-m, ui-s, ui-xs, ui-val, cap, h4 */
  s: string;
  /** color token or hex; heading color by default */
  c?: string;
  /** hugging text never wraps (as in Figma); give it a width and it does */
  w?: Size;
  o?: number;
  children: ReactNode;
};

export function T({ s, c = "heading", w, o, children }: TextProps) {
  return (
    <span
      className={`t t-${s}`}
      data-w={w === "fill" ? "fill" : w ? "fixed" : undefined}
      style={{ color: col(c), width: typeof w === "number" ? w : undefined, opacity: o }}
    >
      {children}
    </span>
  );
}
