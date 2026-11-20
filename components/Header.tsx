import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { Button } from "@/components/ui";
import { nav } from "@/lib/home";
import { industries } from "@/lib/industries";
import { services } from "@/lib/services";

const MENUS = {
  services: services.map(({ slug, navLabel }) => ({ label: navLabel, href: `/services/${slug}` })),
  industries: industries.map(({ id, name }) => ({ label: name, href: `/industries#${id}` })),
};

/* No client JavaScript: the desktop dropdowns open on hover and focus, and the
   tablet and phone menu is a native <details>. */
export default function Header() {
  return (
    <header className="header">
      <div className="container header-in">
        <Link className="logo" href="/" aria-label="Valentisys home">
          <Image src="/logo/logo-valentisys.png" alt="" width={150} height={40} priority />
        </Link>

        <nav className="nav" aria-label="Main">
          {nav.map((item) =>
            "menu" in item ? (
              <div className="nav-item" key={item.label}>
                <Link className="nav-link label-m" href={item.href}>
                  {item.label}
                  <Icon name="chevronDown" size={16} c="body" />
                </Link>
                <div className="nav-drop">
                  {MENUS[item.menu].map(({ label, href }) => (
                    <Link className="label-s" href={href} key={href}>
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link className="nav-link label-m" href={item.href} key={item.label}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="header-actions">
          <Button href="/contact">Discuss Your Project</Button>
          <details className="menu">
            <summary className="menu-btn" aria-label="Menu">
              <Icon name="menu" size={20} c="heading" />
            </summary>
            <nav className="menu-panel" aria-label="Menu">
              {nav.map((item) => (
                <div className="menu-group" key={item.label}>
                  <Link className="label-l" href={item.href}>
                    {item.label}
                  </Link>
                  {"menu" in item && (
                    <div className="menu-sub">
                      {MENUS[item.menu].map(({ label, href }) => (
                        <Link className="body-s" href={href} key={href}>
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button href="/contact">Discuss Your Project</Button>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
