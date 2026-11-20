import Image from "next/image";
import Icon from "@/components/Icon";
import { Badge, Button, Flag, Mark } from "@/components/ui";
import { insights } from "@/lib/home";

/*
 * PLACEHOLDER section: the site has no blog yet. The three article titles are
 * the samples from the design and are flagged as such on the page, and the
 * cards are not links because there is nothing to open.
 */
export default function Insights() {
  return (
    <section className="section insights" id="insights">
      <div className="container">
        <div className="sec-head" data-reveal>
          <div className="sec-head-copy">
            <Badge>{insights.badge}</Badge>
            <h2 className="h2">
              <Mark text={insights.title} mark={insights.mark} />
            </h2>
            <div className="lead-flag">
              <p className="body-l">{insights.lead}</p>
              <Flag>Sample titles</Flag>
            </div>
          </div>
          <Button href="#insights" variant="secondary">
            View All Articles
          </Button>
        </div>

        <ul className="articles">
          {insights.articles.map(({ category, readTime, title, excerpt, image, tint }) => (
            <li className="article" key={title} data-reveal>
              <div className={`article-image${tint ? " article-image-tint" : ""}`}>
                <Image src={image} alt="" fill sizes="(max-width: 767px) 100vw, 384px" />
              </div>
              <div className="article-body">
                <p className="article-meta">
                  <span className="eyebrow">{category}</span>
                  <span className="caption">{readTime}</span>
                </p>
                <h3 className="h4">{title}</h3>
                <p className="body-s">{excerpt}</p>
                <span className="link-row label-m">
                  Read Article
                  <Icon name="arrowRight" size={18} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
