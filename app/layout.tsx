import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import CookieConsent from "@/components/CookieConsent";
import InlineScript from "@/components/InlineScript";
import JsonLd from "@/components/JsonLd";
import { graph, localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { isPreviewDeploy, site } from "@/lib/site";
import "./globals.css";
import "./site.css";

/* The two families in the Figma file: Manrope for headings and figures, Inter for everything else. */
const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

export const metadata: Metadata = {
  /* makes every relative URL in metadata absolute. Canonicals, OG, icons */
  metadataBase: new URL(site.url),
  title: {
    default: "Valentisys | Outsourcing & Customer Support Services",
    /* per-page titles already end in "| Valentisys", so the template only
       covers anything that sets a bare string */
    template: "%s | Valentisys",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "business",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: "Valentisys | Outsourcing & Customer Support Services",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentisys | Outsourcing & Customer Support Services",
    description: site.description,
  },
  /* a preview deploy (Netlify or Vercel, see lib/site.ts) is noindex whatever
     its canonical says; robots.ts disallows it at the same time */
  robots: isPreviewDeploy
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  /* No `icons` key on purpose: setting one replaces file-convention detection,
     and app/apple-icon.png stops emitting its link. */
  manifest: "/manifest.webmanifest",
  appleWebApp: { title: site.name },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#6D28D9",
};

/* One graph for the whole site. Pages add their own WebPage/Breadcrumb/Service
   nodes that reference these by @id instead of restating the company. */
const siteGraph = graph(organizationSchema(), websiteSchema(), localBusinessSchema());

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={site.lang}
      className={`${manrope.variable} ${inter.variable}`}
      /* globals.css sets scroll-behavior:smooth so in-page anchors glide; this
         tells Next the smooth scrolling is deliberate */
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Gates the scroll-reveal CSS so content stays visible without JS.
            Has to run during parse, before the first paint. See InlineScript. */}
        <InlineScript
          html={
            "document.documentElement.classList.add('js');" +
            /* safety net: if the bundle never hydrates (a failed or blocked
               chunk), un-gate the reveal CSS so the page is never left blank.
               PageEffects adds .hydrated the moment it mounts */
            "addEventListener('load',function(){setTimeout(function(){var h=document.documentElement;if(!h.classList.contains('hydrated'))h.classList.remove('js')},2500)})"
          }
        />
      </head>
      <body>
        {/* first focusable element on every page */}
        <a className="skip" href="#main">
          Skip to main content
        </a>
        {/* before the page, not after it, so the consent dialog is early in
            the tab order. It is position:fixed, so the visual order is unchanged */}
        <CookieConsent />
        {children}
        <JsonLd data={siteGraph} />
      </body>
    </html>
  );
}
