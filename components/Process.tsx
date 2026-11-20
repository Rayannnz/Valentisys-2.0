import Icon from "@/components/Icon";
import { RunbookBoard } from "@/components/Mockups";
import { Button, SectionHead, Tag } from "@/components/ui";
import { process } from "@/lib/home";

export default function Process() {
  const { steps, onboarding } = process;
  return (
    <section className="section process" id="process">
      <div className="container">
        <SectionHead {...process} center lead={<p className="body-l">{process.lead}</p>} />

        <ol className="flow">
          {steps.map(({ icon, title, desc, tags }, i) => (
            <li className="step" key={title} data-reveal>
              <div className="step-rail">
                <span className="step-node">
                  <Icon name={icon} size={22} />
                </span>
                {i < steps.length - 1 && <span className="step-line" />}
              </div>
              <div className="step-copy">
                <p className="eyebrow">Step 0{i + 1}</p>
                <h3 className="h5">{title}</h3>
                <p className="body-s">{desc}</p>
                <ul className="tag-row">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="onboard" data-reveal>
          <div className="onboard-visual" aria-hidden="true">
            <RunbookBoard />
          </div>
          <div className="onboard-copy">
            <h3 className="h3">{onboarding.title}</h3>
            <p className="body-m">{onboarding.lead}</p>
            <ul className="check-list">
              {onboarding.points.map((point) => (
                <li className="body-m" key={point}>
                  <span className="tick tick-24">
                    <Icon name="check" size={12} sw={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Button href="/contact">Request a Consultation</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
