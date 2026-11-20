import type { Metadata } from "next";
import BestWork from "@/components/BestWork";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Industries from "@/components/Industries";
import Insights from "@/components/Insights";
import JsonLd from "@/components/JsonLd";
import PageEffects from "@/components/PageEffects";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Trust from "@/components/Trust";
import { graph, webPageSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Outsourcing & Customer Support Services | Valentisys";
const DESCRIPTION =
  "Valentisys staffs trained remote teams for health, legal, engineering, finance and hospitality, plus the marketing, app and web work that grows them.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/" });

/* the service catalog lives on /services with the full listing; home carries
   only its WebPage node */
const homeGraph = graph(webPageSchema({ name: TITLE, description: DESCRIPTION, path: "/" }));

/* Section order follows the Figma frame "Homepage / Desktop 1440". */
export default function Home() {
  return (
    <>
      <PageEffects />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Trust />
        <Services />
        <Showcase />
        <Process />
        <Industries />
        <BestWork />
        <Insights />
        <Cta />
      </main>
      <Footer />
      <JsonLd data={homeGraph} />
    </>
  );
}
