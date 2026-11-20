import Image from "next/image";
import type { ReactNode } from "react";
import { MiniPod, SupportConsole, WebPortal } from "@/components/Mockups";
import { Badge, Button, Mark, Tag } from "@/components/ui";
import { fits, type Fit } from "@/lib/fits";
import { bestWork } from "@/lib/home";

const fit = (id: Fit["id"]) => fits.find((f) => f.id === id)!;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="case-field">
      <p className="eyebrow">{label}</p>
      <p className="body-s">{children}</p>
    </div>
  );
}

type CaseProps = { id: "front" | "back" | "practices"; lead?: boolean; visual: ReactNode };

/* One "Good fit" from lib/fits.ts as a case card. */
function Case({ id, lead, visual }: CaseProps) {
  const { label, title, desc, service } = fit(id);
  return (
    <article className={`case${lead ? " case-lead" : ""}`} data-reveal>
      <div className={`case-visual case-visual-${id}`} aria-hidden="true">
        {visual}
      </div>
      <div className="case-body">
        <Tag>{label}</Tag>
        <h3 className={lead ? "h3" : "h4"}>{title}</h3>
        <Field label="The challenge">{desc}</Field>
        <Field label="What we put in place">{bestWork.answers[id]}</Field>
        <Button href={`/services/${service}`} variant={lead ? "secondary" : "ghost"}>
          Read Case Study
        </Button>
      </div>
    </article>
  );
}

export default function BestWork() {
  const rescue = fit("rescue");
  return (
    <section className="section" id="best-work">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="sec-head-copy">
            <Badge>{bestWork.badge}</Badge>
            <h2 className="h2">
              <Mark text={bestWork.title} mark={bestWork.mark} />
            </h2>
            <p className="body-l">{bestWork.lead}</p>
          </div>
        </div>

        <div className="cases">
          <Case
            id="front"
            lead
            visual={
              <>
                <div className="case-glow" />
                <div className="case-mock">
                  <SupportConsole />
                </div>
              </>
            }
          />
          <div className="case-row">
            <Case
              id="back"
              visual={
                <div className="case-mock">
                  <WebPortal />
                </div>
              }
            />
            <Case
              id="practices"
              visual={
                <>
                  <Image src="/images/services/outsourcing.jpg" alt="" fill sizes="(max-width: 1199px) 100vw, 588px" />
                  <div className="case-pod">
                    <MiniPod />
                  </div>
                </>
              }
            />
          </div>

          <article className="rescue" data-reveal>
            <div>
              <p className="eyebrow">{rescue.label}</p>
              <h3 className="h4">{rescue.title}</h3>
              <p className="body-s">{rescue.desc}</p>
            </div>
            <Button href="/contact">Request a Consultation</Button>
          </article>
        </div>
      </div>
    </section>
  );
}
