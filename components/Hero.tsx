import { F, T } from "@/components/figma";
import Icon from "@/components/Icon";
import { LineChart, MobileApp, OpsDashboard, Pill } from "@/components/Mockups";
import { Badge, Button, Mark } from "@/components/ui";
import { hero } from "@/lib/home";

/** The 80% ring in the "First response" widget. */
function ProgressRing() {
  const r = 19.36;
  const around = 2 * Math.PI * r;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ flex: "none" }}>
      <circle cx="22" cy="22" r={r} stroke="var(--soft)" strokeWidth="5.28" />
      <circle
        cx="22"
        cy="22"
        r={r}
        stroke="var(--accent)"
        strokeWidth="5.28"
        strokeDasharray={`${around * 0.8} ${around}`}
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-in">
        <div className="hero-copy">
          <Badge>{hero.badge}</Badge>
          <h1 className="display-xl">
            <Mark text={hero.title} mark={hero.mark} />
          </h1>
          <p className="body-l hero-lead">{hero.lead}</p>
          <div className="btn-row">
            <Button href="/contact" magnetic>Discuss Your Project</Button>
            <Button href="/services" variant="secondary" magnetic>
              Explore Services
            </Button>
          </div>
        </div>

        {/* Illustration only: sample figures, hidden from assistive tech. */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-dash">
            <OpsDashboard />
          </div>
          <div className="hero-phone">
            <MobileApp />
          </div>

          <F className="widget hw-flow" parallax={10} g={10} p={[14, 16]}>
            <T s="cap" c="body">
              How a pod plugs in
            </T>
            <F d="H" g={6} ai="CENTER">
              <F d="H" p={[6, 10]} r={8} fill="bg2">
                <T s="ui-s">Your tools</T>
              </F>
              <F w={14} h={2} r={1} fill="line-strong" />
              <F d="H" p={[6, 10]} r={8} fill="accent">
                <T s="ui-s" c="white">
                  Dedicated pod
                </T>
              </F>
              <F w={14} h={2} r={1} fill="line-strong" />
              <F d="H" p={[6, 10]} r={8} fill="bg2">
                <T s="ui-s">Your customers</T>
              </F>
            </F>
          </F>

          <F className="widget hw-sla" parallax={16} g={6} p={16} w={168}>
            <F d="H" g={8} ai="CENTER">
              <F w={26} h={26} r={8} ai="CENTER" ji="CENTER" fill="tint">
                <Icon name="shieldCheck" size={14} c="accent" />
              </F>
              <T s="cap" c="body">
                SLA met
              </T>
            </F>
            <T s="stat-m">98.6%</T>
            <LineChart w={136} h={34} vals={[90, 92, 91, 94, 95, 94, 97, 96, 98, 99]} small />
          </F>

          <F className="widget hw-first" parallax={12} d="H" g={12} ai="CENTER" p={[14, 16]}>
            <ProgressRing />
            <F g={2}>
              <T s="cap" c="body">
                First response
              </T>
              <F d="H" g={8} ai="CENTER">
                <T s="ui-val">2m 14s</T>
                <Pill tone="ok">18s faster</Pill>
              </F>
            </F>
          </F>
        </div>
      </div>
    </section>
  );
}
