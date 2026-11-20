import Image from "next/image";
import Icon from "@/components/Icon";
import { Badge, Button, Mark } from "@/components/ui";
import { cta } from "@/lib/home";
import { contactEmail } from "@/lib/site";

export default function Cta() {
  return (
    <section className="section cta">
      <div className="container">
        <div className="cta-card">
          <div className="cta-copy">
            <Badge>{cta.badge}</Badge>
            <h2 className="display-l" data-reveal>
              <Mark text={cta.title} mark={cta.mark} />
            </h2>
            <p className="body-l" data-reveal>{cta.lead}</p>
            <div className="btn-row" data-reveal>
              <Button href="/contact" magnetic>Get Started</Button>
              <Button href="/contact" variant="secondary">
                Request a Quote
              </Button>
            </div>
            <p className="cta-mail body-s">
              <Icon name="mail" size={18} />
              <span>
                Or write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </span>
            </p>
          </div>
          <Image className="cta-art" src="/images/art/cta-rings.png" alt="" width={720} height={480} />
        </div>
      </div>
    </section>
  );
}
