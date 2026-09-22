import WorkflowVerticalPage from "../../../components/WorkflowVerticalPage";
import { DatabaseIcon, ReportIcon, SearchIcon } from "../../../components/Icons";

export const metadata = {
  title: "Flooho — GTM Automation",
};

const pain = {
  headline: "The three things eating your sales team's week.",
  cards: [
    {
      icon: <DatabaseIcon />,
      heading: "CRM hygiene",
      statText: "Goes stale",
      caption: "Next-step fields drift the moment attention moves on",
      consequence: "Pipeline reviews built on data nobody trusts.",
    },
    {
      icon: <ReportIcon />,
      heading: "Post-discovery notes",
      statText: "Stays unwritten",
      caption: "Call notes wait on someone remembering to log them",
      consequence: "Context lost. Deals slip. Handoffs break.",
    },
    {
      icon: <SearchIcon />,
      heading: "Prospecting",
      statText: "Skipped",
      caption: "Research and outreach prep lose out to whatever's on fire",
      consequence: "The work that grows the pipeline is the work that gets cut.",
    },
  ],
  // The founder case-study page this links to isn't built yet (out of scope
  // for this change — see SOLUTIONS_PAGES_build_prompt.md Task 1, item 2).
  // This route will 404 until that page ships.
  footer: {
    type: "link",
    text: "This isn't hypothetical. One of our own founders lived it before automating it away.",
    linkText: "Read the story →",
    href: "/solutions/gtm-automation/case-study",
  },
};

const gap = {
  shouldNodes: [
    { content: "●", caption: "Call ends" },
    { content: "●", caption: "Notes logged" },
    { content: "●", caption: "Next step set" },
  ],
  actualNodes: [
    { content: "●", caption: "Call ends" },
    { content: "?", caption: "Notes logged?", warn: true },
    { content: "+72h", caption: "Next step set", warn: true },
  ],
  actualNote: "Overdue · still in the rep's head",
  closingLine: "The gap isn't effort. It's the admin work between the moments that matter.",
};

const trigger = {
  signal: 'deal stage → "opportunity"',
  outputs: ["pipeline hygiene", "call notes", "prospect research"],
};

const workflows = [
  {
    number: "01",
    painLabel: "CRM hygiene",
    title: "Pipeline hygiene + CRM updates",
    body: "Stale fields flagged automatically. A team chat channel and linked ticket appear the moment a deal goes into play, so nothing waits on someone remembering to create either.",
  },
  {
    number: "02",
    painLabel: "Post-discovery notes",
    title: "Call notes + 1:1 prep",
    body: "Transcripts summarized, next steps drafted, and a prep doc written before the call is even fully wrapped up.",
  },
  {
    number: "03",
    painLabel: "Prospecting",
    title: "Prospect research + outreach drafts",
    body: "Research done and outreach drafted ahead of the first send. The rep reviews and approves, and nothing goes out on its own.",
  },
];

const proof = {
  headline: "What it actually produces",
  subtext: "Illustrative example of Workflow 01's output, from a real deal, same shape as what ships today.",
  panelLabel: "#opportunity-northwind-io",
  lines: [
    {
      title: "Channel created",
      body: "Company, contact, email, and CRM record linked automatically.",
    },
    {
      title: "Ticket filed",
      body: "Linked ticket created under the Opportunity project, deduped against existing tickets.",
    },
    {
      title: "Stale fields flagged",
      body: "Next-step field checked against last-touch date; flagged if overdue.",
    },
  ],
};

export default function GtmAutomationPage() {
  return (
    <WorkflowVerticalPage
      breadcrumbLabel="GTM Automation"
      pain={pain}
      gap={gap}
      trigger={trigger}
      workflows={workflows}
      proof={proof}
    />
  );
}
