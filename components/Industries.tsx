import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { Button, SectionHead } from "@/components/ui";
import { industriesIntro } from "@/lib/home";
import { industries } from "@/lib/industries";

const ICONS: Record<string, IconName> = {
  health: "heart",
  legal: "scale",
  engineering: "compass",
  finance: "dollar",
  hospitality: "concierge",
};

/* The first two sectors get the large tiles with their tags; the rest are small. */
const BIG = 2;

export default function Industries() {
  return (
    <section className="section industries" id="industries">
      <div className="container">
        <SectionHead
          {...industriesIntro}
          lead={<p className="body-l">{industriesIntro.lead}</p>}
          action={
            <Button href="/industries" variant="secondary">
              View All Industries
            </Button>
          }
        />
        <ul className="ind-grid">
          {industries.map(({ id, name, tagline, imageAlt, tags }, i) => {
            const big = i < BIG;
            return (
              <li className={big ? "ind-big" : undefined} key={id} data-reveal>
                <Link className="ind-tile" href={`/industries#${id}`}>
                  <Image
                    src={`/images/industries/${id}.jpg`}
                    alt={imageAlt ?? ""}
                    fill
                    sizes={big ? "(max-width: 767px) 100vw, 588px" : "(max-width: 767px) 100vw, 384px"}
                  />
                  <span className="ind-arrow">
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                  <span className="ind-icon">
                    <Icon name={ICONS[id] ?? "briefcase"} size={20} />
                  </span>
                  <span className={big ? "h3" : "h4"}>{name}</span>
                  <span className={big ? "body-m" : "body-s"}>{tagline}</span>
                  {big && (
                    <span className="ind-tags">
                      {tags.slice(0, 3).map((tag) => (
                        <span className="caption" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
