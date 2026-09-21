import WorkflowVerticalPage from "../../../components/WorkflowVerticalPage";
import { TrendUpIcon, DocumentStackIcon, ChartAxisIcon } from "../../../components/Icons";

export const metadata = {
  title: "Flooho — Product Management Automation",
};

const pain = {
  headline: "The three things eating your product team's week.",
  cards: [
    {
      icon: <TrendUpIcon />,
      heading: "Roadmap hygiene",
      statText: "Out of sync",
      caption: "Roadmap items drift the moment priorities shift",
      consequence: "Stakeholders make decisions off a roadmap that's already wrong.",
    },
    {
      icon: <DocumentStackIcon />,
      heading: "Spec-to-ticket handoff",
      statText: "Loses detail",
      caption: "Specs get rewritten by hand into tickets, piece by piece",
      consequence: "Engineering builds from a summary, not the actual spec.",
    },
    {
      icon: <ChartAxisIcon />,
      heading: "Status reporting",
      statText: "Rebuilt weekly",
      caption: "Someone reconstructs the status update from scratch, every cycle",
      consequence: "Hours spent reporting on the work instead of doing it.",
    },
  ],
  // No case study exists for this vertical yet — plain note, not a link.
  footer: {
    type: "note",
    text: "A dogfooded founder story for this vertical is in progress — check back soon.",
  },
};

const gap = {
  shouldNodes: [
    { content: "●", caption: "Spec approved" },
    { content: "●", caption: "Tickets scoped" },
    { content: "●", caption: "Sprint planned" },
  ],
  actualNodes: [
    { content: "●", caption: "Spec approved" },
    { content: "?", caption: "Tickets scoped?", warn: true },
    { content: "+5d", caption: "Sprint planned", warn: true },
  ],
  actualNote: "Overdue · still in the doc's comments",
  closingLine: "The gap isn't the plan. It's the translation between the plan and the ticket queue.",
};

const trigger = {
  signal: 'spec status → "ready for build"',
  outputs: ["roadmap sync", "spec-to-ticket handoff", "status reporting"],
};

const workflows = [
  {
    number: "01",
    painLabel: "Roadmap hygiene",
    title: "Roadmap sync + stakeholder view",
    body: "Roadmap items are checked against linked ticket status automatically — stale or drifted items get flagged instead of sitting unnoticed until the next planning review.",
  },
  {
    number: "02",
    painLabel: "Spec-to-ticket handoff",
    title: "Spec-to-ticket handoff",
    body: "Spec sections turn into scoped tickets with acceptance criteria intact and a link back to the source doc — no detail lost in a manual rewrite.",
  },
  {
    number: "03",
    painLabel: "Status reporting",
    title: "Status digest, drafted for review",
    body: "A status update is assembled from real ticket and roadmap movement — the PM reviews and edits before it goes to stakeholders, nothing is sent on its own.",
  },
];

// Explicitly hedged — nothing in this vertical has shipped yet (unlike GTM
// Workflow 01), so the proof section reads as illustrative-of-target, not
// "ships today." Do not tighten this copy to match GTM's confidence level.
const proof = {
  headline: "What it's built to produce",
  subtext:
    "Illustrative example of the spec-to-ticket handoff — the shape of the output this workflow is designed to ship.",
  panelLabel: "spec-checkout-redesign",
  lines: [
    {
      title: "Tickets created",
      body: "Three scoped tickets generated from the spec's requirement sections, linked back to source.",
    },
    {
      title: "Roadmap item updated",
      body: 'Status moved to "In build" and linked to the new tickets automatically.',
    },
    {
      title: "Stakeholder note drafted",
      body: "A short update ready for review before it goes out — nothing sent automatically.",
    },
  ],
};

export default function ProductManagementAutomationPage() {
  return (
    <WorkflowVerticalPage
      breadcrumbLabel="Product Management"
      pain={pain}
      gap={gap}
      trigger={trigger}
      workflows={workflows}
      proof={proof}
    />
  );
}
