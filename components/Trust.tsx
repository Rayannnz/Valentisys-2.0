import Image from "next/image";
import Icon from "@/components/Icon";
import { Badge, Mark, Tag } from "@/components/ui";
import { why } from "@/lib/home";
import { site } from "@/lib/site";

/* the home office is listed last, after the markets the teams serve */
const regions = [...site.areaServed].sort((a, b) => Number(a === site.address.countryName) - Number(b === site.address.countryName));

export default function Trust() {
  return (
    <section className="trust" id="why">
      <div className="container trust-in">
        <div className="why">
          <div className="why-copy" data-reveal>
            <Badge>{why.badge}</Badge>
            <h2 className="h2">
              <Mark text={why.title} mark={why.mark} />
            </h2>
            <p className="body-l">{why.lead}</p>
            <div className="why-photo">
              <Image src="/images/team-office.jpg" alt={why.photoAlt} fill sizes="(max-width: 1199px) 100vw, 500px" />
              <div className="why-note">
                <p className="h4">{why.note.title}</p>
                <p className="body-s">{why.note.text}</p>
              </div>
            </div>
          </div>
          <ul className="principles">
            {why.principles.map(({ icon, title, desc }) => (
              <li className="principle" key={title} data-reveal>
                <span className="icon-tile">
                  <Icon name={icon} size={22} />
                </span>
                <div>
                  <h3 className="h4">{title}</h3>
                  <p className="body-s">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="regions" data-reveal>
          <div className="regions-lead">
            <span className="icon-tile icon-tile-44">
              <Icon name="globe" size={20} />
            </span>
            <div>
              <p className="label-l">{why.regions.title}</p>
              <p className="body-s">{why.regions.text}</p>
            </div>
          </div>
          <ul className="tag-row">
            {regions.map((region) => (
              <li key={region}>
                <Tag>{region}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
