"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "@/components/ui";

type Tab = { id: string; title: string; desc: string; href: string; cta: string; visual: ReactNode };

/* Vertical tabs: the selected one opens to show its description, and the stage
   on the right swaps to its mockup. Arrow keys, Home and End move between tabs. */
export default function ShowcaseTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const to = { ArrowDown: active + 1, ArrowUp: active - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const next = (to + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="split" data-reveal>
      <div className="tabs">
        <div role="tablist" aria-orientation="vertical" aria-label="Services in practice" onKeyDown={onKeyDown}>
          {tabs.map(({ id, title, desc }, i) => (
            <button
              key={id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="tab"
              role="tab"
              id={`tab-${id}`}
              aria-selected={i === active}
              aria-controls={`panel-${id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
            >
              <span className="tab-index">0{i + 1}</span>
              <span className="tab-copy">
                <span className="h5">{title}</span>
                {i === active && <span className="body-s">{desc}</span>}
              </span>
            </button>
          ))}
        </div>
        <div className="tab-cta">
          <Button href={tabs[active].href}>{tabs[active].cta}</Button>
        </div>
      </div>

      <div className="stage">
        <div className="stage-glow" />
        {tabs.map(({ id, visual }, i) => (
          /* the mockups are illustrations with sample figures, so the panel is
             labelled by its tab and its contents are hidden from assistive tech */
          <div key={id} role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={i !== active}>
            <div aria-hidden="true">{visual}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
