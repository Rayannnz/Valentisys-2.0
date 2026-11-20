import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "@/components/Icon";

/* The small reusable pieces from the Figma "UI Components" board. */

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  /** the button leans toward the pointer (wired by PageEffects) */
  magnetic?: boolean;
  children: ReactNode;
};

export function Button({ href, variant = "primary", className, magnetic, children }: ButtonProps) {
  return (
    <Link className={`btn btn-${variant}${className ? ` ${className}` : ""}`} href={href} data-magnetic={magnetic ? "" : undefined}>
      {children}
      <Icon name="arrowRight" size={18} />
    </Link>
  );
}

/** Pill above a section heading: accent dot plus an uppercase label. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <p className="badge eyebrow">
      <i />
      {children}
    </p>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag caption">{children}</span>;
}

/** Amber marker on content that is still a placeholder. */
export function Flag({ children }: { children: ReactNode }) {
  return (
    <span className="flag caption">
      <i />
      {children}
    </span>
  );
}

/** Heading text with one phrase printed in the accent color. */
export function Mark({ text, mark }: { text: string; mark: string }) {
  const at = text.indexOf(mark);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className="mark">{mark}</em>
      {text.slice(at + mark.length)}
    </>
  );
}

type SectionHeadProps = {
  badge: string;
  title: string;
  mark: string;
  lead?: ReactNode;
  /** a button on the right (desktop) or under the copy (tablet and phone) */
  action?: ReactNode;
  center?: boolean;
};

export function SectionHead({ badge, title, mark, lead, action, center }: SectionHeadProps) {
  return (
    <div className={`sec-head${center ? " sec-head-center" : ""}`} data-reveal>
      <div className="sec-head-copy">
        <Badge>{badge}</Badge>
        <h2 className="h2">
          <Mark text={title} mark={mark} />
        </h2>
        {lead}
      </div>
      {action}
    </div>
  );
}
