export type Industry = {
  id: string;
  name: string;
  /** one line for the homepage tile; `desc` is the full accordion copy */
  tagline: string;
  /** homepage tile photo at /images/industries/<id>.jpg; omit and the tile is text-only */
  imageAlt?: string;
  desc: string;
  tags: string[];
};

export const industries: Industry[] = [
  {
    id: "health",
    name: "Health",
    tagline: "Front desk, scheduling, and authorizations for clinics and practices.",
    imageAlt: "Doctor filling in a patient's medical history form across the desk from them",
    desc: "Practices, clinics, and health services get a remote front desk that answers every call, scheduling that cuts no-shows, and authorizations followed through to approval.",
    tags: ["Clinics & practices", "Patient scheduling", "Prior authorization", "Patient questions"],
  },
  {
    id: "legal",
    name: "Legal",
    tagline: "Paralegal support and case files kept in order, under NDA.",
    imageAlt: "Wooden gavel resting beside an open law book",
    desc: "Law firms and in-house legal teams get paralegal support, document preparation, and case files kept in order by staff who understand the paperwork and the confidentiality that comes with it.",
    tags: ["Law firms", "Paralegal support", "Case files", "Contract drafting"],
  },
  {
    id: "engineering",
    name: "Engineering",
    tagline: "Bid documentation, drawing admin, and project coordination.",
    imageAlt: "Engineers working at monitors in a busy open-plan office",
    desc: "Engineering and construction firms get bid and proposal documentation, drawing and revision admin, and the project coordination that keeps a job moving between the field and the office.",
    tags: ["Consulting firms", "Bid documentation", "Drawing admin", "Project coordination"],
  },
  {
    id: "finance",
    name: "Finance",
    tagline: "Bookkeeping and reconciliations that hold up under audit.",
    imageAlt: "Finance professional reviewing bar charts on a tablet beside a calculator",
    desc: "Accounting firms, brokers, and financial services get bookkeeping, reconciliations, and accounts management handled to a standard that holds up under audit.",
    tags: ["Accounting", "Bookkeeping", "Reconciliation", "Accounts management"],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    tagline: "Reservations, guest messaging, and reviews, around the clock.",
    imageAlt: "Host welcoming two smiling guests with backpacks at the front door",
    desc: "Hotels, restaurants, and travel operators get reservations and guest messaging covered around the clock, reviews answered, and a social presence that fills rooms and tables.",
    tags: ["Hotels & resorts", "Reservations", "Guest support", "Review management"],
  },
];
