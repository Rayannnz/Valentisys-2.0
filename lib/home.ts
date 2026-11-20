import type { IconName } from "@/components/Icon";

/*
 * Homepage copy that the current site keeps inside its components (hero, Why
 * Valentisys, process, CTA). It is collected here so the new design reads all
 * of its words from lib/. Services, industries, company facts and the "Good
 * fits" scenarios keep their own files, copied unchanged from the current site.
 *
 * `mark` is the phrase of a heading the design prints in the accent color.
 */

export const nav = [
  { label: "Services", href: "/services", menu: "services" },
  { label: "Industries", href: "/industries", menu: "industries" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  badge: "Outsourcing, support & growth",
  title: "Staff, support, and grow your business.",
  mark: "grow your business.",
  lead: "Dedicated remote staff and customer support for health, legal, engineering, finance, and hospitality, plus the social, app, and web work that grows what you've built.",};

export const why = {
  badge: "Why Valentisys",
  title: "Outsourcing should feel like adding to your team, not managing a vendor.",
  mark: "adding to your team",
  lead: "The principles behind every engagement. No exceptions, no fine print.",
  photoAlt: "Team working at desks in an open-plan office under hanging pendant lights",
  note: {
    title: "One team",
    text: "From the first call onward. No handoffs, no account managers in between.",
  },
  principles: [
    {
      icon: "briefcase",
      title: "Trained for your sector",
      desc: "People who already know the paperwork, deadlines, and tone your industry runs on, not a generic pool learning it on your account.",
    },
    {
      icon: "clock",
      title: "Cover on your hours",
      desc: "Teams scheduled around your time zone and your customers' hours, so calls get answered and work lands when you need it, not ours.",
    },
    {
      icon: "lock",
      title: "Confidential by default",
      desc: "Signed NDAs, least-privilege access to your systems, and handling built for the records health, legal, and finance work depends on.",
    },
    {
      icon: "barChart",
      title: "Measured, not assumed",
      desc: "Agreed SLAs, weekly numbers, and a named contact who answers. You see the output instead of taking our word for it.",
    },
  ] satisfies { icon: IconName; title: string; desc: string }[],
  regions: {
    title: "Remote delivery, wherever you operate",
    text: "Teams scheduled around your time zone",
  },
};

export const servicesIntro = {
  badge: "What we do",
  title: "Every service line, under one roof.",
  mark: "under one roof.",
  lead: "Dedicated remote teams for the work behind your business, plus the apps, websites, and campaigns that grow what you have built.",
};

export const showcase = {
  badge: "Capabilities in practice",
  title: "What each service looks like in practice.",
  mark: "in practice.",
  lead: "Interfaces and workflows modeled on the work we run every day. All figures shown are sample data.",
  /** the service lines that get a tab, in display order */
  tabs: ["ai-solutions", "real-customer-support", "digital-marketing", "app-development", "web-development"],
  /** a tab shows its service's `lead`; the design shortens this one */
  desc: {
    "ai-solutions":
      "Assistants, automations, and document workflows built around your process, measured on hours saved and errors avoided.",
  } as Record<string, string>,
};

export const process = {
  badge: "How we work",
  title: "A clear path from scoping call to steady delivery.",
  mark: "steady delivery.",
  lead: "Every step has a written outcome, and nothing starts until you have signed off.",
  steps: [
    {
      icon: "phone",
      title: "Scoping call",
      desc: "We map the work, the volume, and the hours you need covered, then come back with a scope and a price you can hold us to.",
      tags: ["Discovery", "Volume review", "Fixed quote"],
    },
    {
      icon: "userCheck",
      title: "Team match",
      desc: "We shortlist people against your brief: sector experience, language, and the tools you already run on. You meet them before anything starts.",
      tags: ["Vetting", "Shortlist", "Your sign-off"],
    },
    {
      icon: "bookOpen",
      title: "Onboarding",
      desc: "Access, tools, and your process written into a runbook, so the team works your way from day one instead of guessing at it.",
      tags: ["Runbook", "Systems access", "Training"],
    },
    {
      icon: "eye",
      title: "Supervised start",
      desc: "Live work begins under close supervision, with early output reviewed daily until the quality is where you want it.",
      tags: ["Daily review", "QA sampling", "Feedback loop"],
    },
    {
      icon: "fileText",
      title: "Reporting",
      desc: "Agreed SLAs, weekly numbers, and a named account lead who picks up when something needs escalating.",
      tags: ["SLAs", "Weekly reports", "Escalation path"],
    },
    {
      icon: "sliders",
      title: "Scale or adjust",
      desc: "Add hours, add people, or wind down as demand shifts. Reviewed every quarter so you never pay for capacity you stopped needing.",
      tags: ["Flex capacity", "Quarterly review", "No lock-in"],
    },
  ] satisfies { icon: IconName; title: string; desc: string; tags: string[] }[],
  onboarding: {
    title: "What onboarding looks like",
    lead: "Your process is written into a runbook before live work begins, so the team works your way from day one.",
    points: [
      "Access, tools, and training tracked in one place",
      "Early output reviewed daily until quality is where you want it",
      "Weekly numbers and a named account lead",
    ],
  },
};

export const industriesIntro = {
  badge: "Industries",
  title: "Built for the sectors we know.",
  mark: "sectors we know.",
  lead: "Trained remote teams for health, legal, engineering, finance, and hospitality businesses, with people who already know the paperwork.",
};

export const bestWork = {
  badge: "Where we fit",
  title: "Where we do our best work.",
  mark: "best work.",
  lead: "The situations clients bring us most often, and what we put in place.",
  /** what we put in place for each "Good fit" in lib/fits.ts, keyed by its id */
  answers: {
    front: "Real Customer Support with coverage that matches your clients' hours, clear SLAs, and weekly reporting.",
    back: "Outsourcing Services: people who join your tools and rituals, with clear ownership and measurable output.",
    practices: "A dedicated pod matched to your brief, trained on your process, and scaled up or down as demand shifts.",
  },
};

/** PLACEHOLDER: the site has no blog yet. These three titles are samples from the design. */
export const insights = {
  badge: "Insights",
  title: "Notes from the work.",
  mark: "the work.",
  lead: "Practical writing on outsourcing, support, and the tools behind them.",
  articles: [
    {
      category: "AI Solutions",
      readTime: "6 min read",
      title: "Where to start with document automation",
      excerpt: "Pick one workflow, measure it against the manual version, and only then automate the next.",
      image: "/images/art/article-document.png",
      tint: false,
    },
    {
      category: "Customer Support",
      readTime: "5 min read",
      title: "What an SLA should say before you sign it",
      excerpt: "The numbers to agree up front, and how weekly reporting keeps everyone looking at the same thing.",
      image: "/images/services/real-customer-support.jpg",
      tint: true,
    },
    {
      category: "Digital Marketing",
      readTime: "4 min read",
      title: "Reporting that ties marketing to sales",
      excerpt: "Why every channel should be measured against pipeline, not likes, reach, or vanity metrics.",
      image: "/images/services/digital-marketing.jpg",
      tint: true,
    },
  ],
};

export const cta = {
  badge: "Get started",
  title: "Let's make your next hire easy.",
  mark: "easy.",
  lead: "Tell us what you need and we'll scope it, price it, and staff it in days, not months.",
};

export const footer = {
  company: [
    { label: "About", href: "/about" },
    { label: "Why Valentisys", href: "/#why" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Sitemap", href: "/sitemap" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
  note: "Remote teams on your hours",
};
