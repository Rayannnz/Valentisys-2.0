/**
 * The "Good fits" scenarios: the situations where Valentisys does its best work.
 * /about lists all of them; the home page turns them into the Best Work cards.
 *
 * `service` is the slug in lib/services.ts of the service line that answers the
 * situation. The home cards read their "what we put in place" copy and their
 * link from that entry, so nothing is claimed here that a service page doesn't
 * already say. A scenario without one (the rescue) links to /contact instead.
 */
export type Fit = {
  id: "practices" | "front" | "back" | "rescue";
  label: string;
  title: string;
  desc: string;
  service?: string;
};

export const fits: Fit[] = [
  {
    id: "practices",
    label: "Practices & firms",
    title: "Growing faster than you can hire",
    desc: "The caseload is up, local hiring is slow and expensive, and qualified people are doing work that should never have reached their desk.",
    service: "outsourcing",
  },
  {
    id: "front",
    label: "Front offices",
    title: "Calls and inquiries going unanswered",
    desc: "The phone rings out at lunch, inquiries sit overnight, and you can hear the business you're losing. We cover the hours you can't.",
    service: "real-customer-support",
  },
  {
    id: "back",
    label: "Back offices",
    title: "Paperwork stacking up behind the work",
    desc: "Files, filings, invoices, and reconciliations quietly fall behind until a deadline forces a scramble. We keep them current instead.",
    service: "outsourcing",
  },
  {
    id: "rescue",
    label: "Rescues",
    title: "An outsourcing arrangement that went wrong",
    desc: "A provider who overpromised, staff who churned every month, quality you ended up policing yourself. We'll take an honest look and tell you what's salvageable.",
  },
];
