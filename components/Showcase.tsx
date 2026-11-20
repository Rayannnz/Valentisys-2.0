import type { ReactNode } from "react";
import { F, T } from "@/components/figma";
import Icon from "@/components/Icon";
import { AiAssistant, MarketingAnalytics, MobileApp, SupportConsole, WebPortal } from "@/components/Mockups";
import ShowcaseTabs from "@/components/ShowcaseTabs";
import { Badge, Mark } from "@/components/ui";
import { showcase } from "@/lib/home";
import { services } from "@/lib/services";

/* The interface that illustrates each tab. The AI tab also carries the floating
   "A person signs off" note from the design. */
const VISUALS: Record<string, ReactNode> = {
  "ai-solutions": (
    <>
      <div className="stage-mock">
        <AiAssistant />
      </div>
      <F className="widget stage-note" d="H" g={10} ai="CENTER" p={[12, 16]}>
        <F w={30} h={30} r={999} ai="CENTER" ji="CENTER" fill="ok">
          <Icon name="check" size={14} sw={3} c="white" />
        </F>
        <F g={1}>
          <T s="ui-m">A person signs off</T>
          <T s="ui-s" c="body">
            Before anything is sent
          </T>
        </F>
      </F>
    </>
  ),
  "real-customer-support": (
    <div className="stage-mock">
      <SupportConsole />
    </div>
  ),
  "digital-marketing": (
    <div className="stage-mock">
      <MarketingAnalytics />
    </div>
  ),
  "app-development": (
    <div className="stage-mock stage-mock-phone">
      <MobileApp />
    </div>
  ),
  "web-development": (
    <div className="stage-mock">
      <WebPortal />
    </div>
  ),
};

/* Server wrapper: reads the service copy and hands plain strings plus the
   already-rendered mockups to the client tabs. */
export default function Showcase() {
  const tabs = showcase.tabs.flatMap((slug) => {
    const service = services.find((s) => s.slug === slug);
    return service
      ? [{ id: slug, title: service.title, desc: showcase.desc[slug] ?? service.lead, href: `/services/${slug}`, cta: `Explore ${service.navLabel}`, visual: VISUALS[slug] }]
      : [];
  });

  return (
    <section className="section showcase" id="showcase">
      <div className="showcase-glow" />
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="sec-head-copy">
            <Badge>{showcase.badge}</Badge>
            <h2 className="h2">
              <Mark text={showcase.title} mark={showcase.mark} />
            </h2>
            <p className="body-l">{showcase.lead}</p>
          </div>
        </div>
        <ShowcaseTabs tabs={tabs} />
      </div>
    </section>
  );
}
