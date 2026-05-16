import type { Quadrant } from "./mission-matrix-types";

/**
 * A seed task is a representative piece of work for a given role.
 * The `hint` is the *curator's* guess at where it tends to land — used
 * only to verify balance across the four quadrants during authoring.
 * It is NOT shown to the user. Users always rate tasks themselves.
 */
export interface SeedTask {
  text: string;
  hint: Quadrant;
}

export interface SeedRole {
  /** URL-safe slug */
  id: string;
  /** User-facing label */
  label: string;
  /** ~10 tasks, roughly balanced across the four quadrants */
  tasks: SeedTask[];
}

/**
 * Order: non-technical roles first; technical roles (PM, SWE) at the end.
 * Each role has 10–12 tasks roughly balanced 3/3/2/3 across craft/growth/routine/drain.
 */
export const SEED_ROLES: SeedRole[] = [
  {
    id: "ceo-founder",
    label: "Leadership / Executive",
    tasks: [
      { text: "Setting the next 12-month strategy with the leadership team", hint: "craft" },
      { text: "Holding a hard 1:1 with a direct report who isn't performing", hint: "craft" },
      { text: "Pitching the company narrative to a key investor or customer", hint: "craft" },
      { text: "Hiring for a function you've never managed before (e.g. your first VP of Sales)", hint: "growth" },
      { text: "Reading the market for an adjacent product bet you're considering", hint: "growth" },
      { text: "Building a board operating rhythm from scratch", hint: "growth" },
      { text: "Expense approvals and routine signoffs", hint: "routine" },
      { text: "Scheduling and rescheduling exec calendars", hint: "routine" },
      { text: "Triaging the shared inbox and forwarded emails", hint: "routine" },
      { text: "Drafting the same investor update email each month", hint: "drain" },
      { text: "Reviewing yet another deck revision before the board meeting", hint: "drain" },
      { text: "Following up on stale action items from last week's 1:1s", hint: "drain" },
    ],
  },

  {
    id: "operations",
    label: "Operations",
    tasks: [
      { text: "Designing a new operating cadence for the leadership team", hint: "craft" },
      { text: "Coaching a department head through rewriting their planning doc", hint: "craft" },
      { text: "Running the post-mortem on a major launch or incident", hint: "craft" },
      { text: "Owning your first international expansion (new entity, payroll, everything)", hint: "growth" },
      { text: "Standing up a procurement function from nothing", hint: "growth" },
      { text: "Building the company's first comp philosophy", hint: "growth" },
      { text: "Renewing recurring vendor contracts", hint: "routine" },
      { text: "Updating the org chart after re-orgs", hint: "routine" },
      { text: "Pulling weekly headcount reports", hint: "routine" },
      { text: "Chasing department leads for their monthly OKR updates", hint: "drain" },
      { text: "Reconciling expense category miscodings", hint: "drain" },
      { text: "Reformatting the all-hands deck the night before", hint: "drain" },
    ],
  },

  {
    id: "hr-people",
    label: "People / HR",
    tasks: [
      { text: "Designing the performance review philosophy for the next cycle", hint: "craft" },
      { text: "Sitting with a manager through a hard termination conversation", hint: "craft" },
      { text: "Building the company's values into hiring rubrics that actually get used", hint: "craft" },
      { text: "Leading your first reduction in force", hint: "growth" },
      { text: "Rolling out a new HRIS platform across the company", hint: "growth" },
      { text: "Building a DEI strategy that has teeth, not just a statement", hint: "growth" },
      { text: "Posting open roles to job boards", hint: "routine" },
      { text: "Processing PTO requests and approvals", hint: "routine" },
      { text: "Sending new-hire welcome packets", hint: "routine" },
      { text: "Scheduling interview loops across calendars", hint: "drain" },
      { text: "Chasing managers for overdue review submissions", hint: "drain" },
      { text: "Updating the employee handbook for the third time this year", hint: "drain" },
    ],
  },

  {
    id: "finance",
    label: "Finance",
    tasks: [
      { text: "Building next fiscal year's plan with the exec team", hint: "craft" },
      { text: "Walking the board through a tough quarter", hint: "craft" },
      { text: "Modeling the unit economics for a new product line", hint: "craft" },
      { text: "Preparing for an audit for the first time", hint: "growth" },
      { text: "Building investor reporting from scratch ahead of a Series A", hint: "growth" },
      { text: "Learning a new ERP system before the migration", hint: "growth" },
      { text: "Reconciling the credit card statements", hint: "routine" },
      { text: "Closing the monthly books", hint: "routine" },
      { text: "Filing recurring tax forms", hint: "routine" },
      { text: "Chasing department heads for their monthly accruals", hint: "drain" },
      { text: "Reformatting the same board financials each quarter", hint: "drain" },
      { text: "Manually pulling data across spreadsheets for the same recurring report", hint: "drain" },
    ],
  },

  {
    id: "marketing",
    label: "Marketing",
    tasks: [
      { text: "Crafting the positioning for a flagship launch", hint: "craft" },
      { text: "Sitting with a customer to write a story only you could tell", hint: "craft" },
      { text: "Leading the brand voice review with the founders", hint: "craft" },
      { text: "Standing up a paid acquisition channel you've never owned", hint: "growth" },
      { text: "Building your first SEO content engine", hint: "growth" },
      { text: "Running your first big in-person event", hint: "growth" },
      { text: "Scheduling social posts across channels", hint: "routine" },
      { text: "Updating UTMs and campaign tags", hint: "routine" },
      { text: "Pulling weekly campaign performance reports", hint: "routine" },
      { text: "QA-ing email subject lines and preview text for the 12th send this month", hint: "drain" },
      { text: "Reformatting blog posts for the CMS", hint: "drain" },
      { text: "Chasing legal and comms for approval on outbound copy", hint: "drain" },
    ],
  },

  {
    id: "sales",
    label: "Sales",
    tasks: [
      { text: "Closing a strategic enterprise deal you've nurtured for months", hint: "craft" },
      { text: "Coaching an AE through a difficult negotiation", hint: "craft" },
      { text: "Sitting with a champion to co-build the business case", hint: "craft" },
      { text: "Selling into a new vertical you've never worked", hint: "growth" },
      { text: "Building a partner channel for the first time", hint: "growth" },
      { text: "Learning to sell a brand-new product line", hint: "growth" },
      { text: "Logging call notes into the CRM", hint: "routine" },
      { text: "Updating deal stages and forecast amounts", hint: "routine" },
      { text: "Adding contacts to outbound sequences", hint: "routine" },
      { text: "Writing the same follow-up email for the 50th lead this week", hint: "drain" },
      { text: "Building bespoke \"custom\" decks that all look the same", hint: "drain" },
      { text: "Pulling pipeline reports for QBRs", hint: "drain" },
    ],
  },

  {
    id: "customer-success",
    label: "Customer Success",
    tasks: [
      { text: "Leading the executive business review with a top account", hint: "craft" },
      { text: "Building a save plan for a strategic account at risk", hint: "craft" },
      { text: "Coaching a CSM through their first hard renewal conversation", hint: "craft" },
      { text: "Owning your first multi-million-dollar renewal", hint: "growth" },
      { text: "Launching a customer advisory board", hint: "growth" },
      { text: "Building the playbook for a new customer segment", hint: "growth" },
      { text: "Logging meeting notes into the CRM", hint: "routine" },
      { text: "Sending the same onboarding email to every new customer", hint: "routine" },
      { text: "Updating customer health scores in the dashboard", hint: "routine" },
      { text: "Reformatting the same QBR template for every account", hint: "drain" },
      { text: "Chasing customers for usage data they could pull themselves", hint: "drain" },
      { text: "Triaging the shared support inbox for questions the docs already answer", hint: "drain" },
    ],
  },

  {
    id: "designer",
    label: "Design",
    tasks: [
      { text: "Designing the core flow for a flagship product launch", hint: "craft" },
      { text: "Mentoring a junior designer through their first hard critique", hint: "craft" },
      { text: "Leading the visual direction for a brand refresh", hint: "craft" },
      { text: "Pitching a new design system direction to the exec team", hint: "growth" },
      { text: "Running your first user research synthesis workshop", hint: "growth" },
      { text: "Learning motion design for an upcoming launch", hint: "growth" },
      { text: "Resizing assets for different ad placements", hint: "routine" },
      { text: "Filing design tickets and tagging them in Linear", hint: "routine" },
      { text: "Naming and organizing Figma layers and components", hint: "routine" },
      { text: "Doing the third round of stakeholder revisions on a deck", hint: "drain" },
      { text: "Reviewing pixel-perfect QA on engineering handoffs", hint: "drain" },
      { text: "Maintaining the icon library", hint: "drain" },
    ],
  },

  {
    id: "product-manager",
    label: "Product",
    tasks: [
      { text: "Defining the strategy for your product area over the next year", hint: "craft" },
      { text: "Sitting with customers to learn what they actually do", hint: "craft" },
      { text: "Leading the trade-off conversation with eng and design on what to cut", hint: "craft" },
      { text: "Owning your first 0→1 product launch", hint: "growth" },
      { text: "Building a pricing and packaging strategy from scratch", hint: "growth" },
      { text: "Running your first hard prioritization process across teams", hint: "growth" },
      { text: "Updating Jira tickets and sprint statuses", hint: "routine" },
      { text: "Triaging the inbound feature request queue", hint: "routine" },
      { text: "Writing the weekly product update", hint: "routine" },
      { text: "Reformatting the same roadmap deck for a fifth audience", hint: "drain" },
      { text: "Chasing engineering leads for ship-date updates", hint: "drain" },
      { text: "Aggregating feedback across CS, support, and sales for the same recurring report", hint: "drain" },
    ],
  },

  {
    id: "software-engineer",
    label: "Engineering",
    tasks: [
      { text: "Designing the architecture for a new system you'll live with for years", hint: "craft" },
      { text: "Mentoring a junior engineer through their first complex change", hint: "craft" },
      { text: "Leading a technical RFC discussion", hint: "craft" },
      { text: "Picking up a brand-new language or framework for an upcoming project", hint: "growth" },
      { text: "Owning your first incident as on-call lead", hint: "growth" },
      { text: "Building your first ML or AI feature", hint: "growth" },
      { text: "Updating dependencies and patching CVEs", hint: "routine" },
      { text: "Approving routine, low-risk PRs", hint: "routine" },
      { text: "Closing duplicate or stale bug reports", hint: "routine" },
      { text: "Resolving merge conflicts across long-lived feature branches", hint: "drain" },
      { text: "Writing the same boilerplate test scaffolding", hint: "drain" },
      { text: "Reformatting commit messages and PR descriptions for team conventions", hint: "drain" },
    ],
  },
];

export function findSeedRole(id: string): SeedRole | undefined {
  return SEED_ROLES.find((r) => r.id === id);
}
