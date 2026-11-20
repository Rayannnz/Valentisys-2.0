import Image from "next/image";
import Link from "next/link";
import { footer } from "@/lib/home";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";
import { careersEmail, contactEmail, site } from "@/lib/site";

const COLUMNS = [
  { title: "Services", links: services.map(({ slug, shortTitle }) => ({ label: shortTitle, href: `/services/${slug}` })) },
  { title: "Industries", links: industries.map(({ id, name }) => ({ label: name, href: `/industries#${id}` })) },
  { title: "Company", links: footer.company },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-in">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="logo-chip" href="/" aria-label="Valentisys home">
              <Image src="/logo/logo-valentisys.png" alt="" width={150} height={40} />
            </Link>
            <p className="body-s">{site.description}</p>
          </div>

          <div className="footer-cols">
            {COLUMNS.map(({ title, links }) => (
              <nav className="footer-col" aria-label={title} key={title}>
                <p className="label-m">{title}</p>
                {links.map(({ label, href }) => (
                  <Link className="body-s" href={href} key={href}>
                    {label}
                  </Link>
                ))}
              </nav>
            ))}
            <div className="footer-col footer-contact">
              <p className="label-m">Contact</p>
              <a className="body-s" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              <a className="body-s" href={`mailto:${careersEmail}`}>
                {careersEmail}
              </a>
              <p className="body-s">{footer.note}</p>
            </div>
          </div>
        </div>

        <div className="footer-bar">
          <p className="body-s">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="footer-legal" aria-label="Legal">
            {footer.legal.map(({ label, href }) => (
              <Link className="body-s" href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
