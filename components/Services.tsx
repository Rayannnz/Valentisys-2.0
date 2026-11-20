import Link from "next/link";
import type { ReactNode } from "react";
import Icon, { type IconName } from "@/components/Icon";
import { MiniAi, MiniBars, MiniBrowser, MiniChat, MiniPhone, MiniPod } from "@/components/Mockups";
import { Button, SectionHead, Tag } from "@/components/ui";
import { servicesIntro } from "@/lib/home";
import { services } from "@/lib/services";

/* Each service line's icon and miniature. A service added to lib/services.ts
   without an entry here still gets a card, just without the illustration. */
const VISUALS: Record<string, [icon: IconName, mini: ReactNode]> = {
  outsourcing: ["users", <MiniPod key="pod" />],
  "real-customer-support": ["headset", <MiniChat key="chat" />],
  "digital-marketing": ["trendingUp", <MiniBars key="bars" />],
  "app-development": ["smartphone", <MiniPhone key="phone" />],
  "web-development": ["code", <MiniBrowser key="browser" />],
  "ai-solutions": ["sparkles", <MiniAi key="ai" />],
};

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead
          {...servicesIntro}
          lead={<p className="body-l">{servicesIntro.lead}</p>}
          action={
            <Button href="/services" variant="secondary">
              View All Services
            </Button>
          }
        />
        <ul className="svc-grid">
          {services.map(({ slug, title, navLabel, homeDesc, panelLabel }) => {
            const [icon, mini] = VISUALS[slug] ?? ["briefcase", null];
            return (
              <li key={slug} data-reveal>
                <Link className="svc-card" href={`/services/${slug}`}>
                  <span className="svc-top">
                    <span className="icon-tile">
                      <Icon name={icon} />
                    </span>
                    <Tag>{panelLabel}</Tag>
                  </span>
                  <span className="svc-copy">
                    <span className="h4">{title}</span>
                    <span className="body-s">{homeDesc}</span>
                  </span>
                  {mini && <span aria-hidden="true">{mini}</span>}
                  <span className="link-row label-m">
                    Explore {navLabel}
                    <Icon name="arrowRight" size={18} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
