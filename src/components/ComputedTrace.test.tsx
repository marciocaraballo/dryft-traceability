jest.mock("@/data/traces.json", () => ({
  "issuePrice.seriesH": {
    type: "stated",
    label: "Original Issue Price — Series H",
    value: "$4.34",
    source: { docId: "coi-helios", page: 17, match: "Original Issue Price" },
  },
}));

jest.mock("@/data/coiDocument.json", () => ({
  docId: "coi-test",
  title: "Certificate of Incorporation",
  company: "HELIOS BIOSCIENCE INC.",
  date: "January 22, 2026",
  totalPages: 1,
  pages: [{ page: 17, text: "Original Issue Price is $4.34." }],
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComputedTrace } from "@/components/ComputedTrace";
import type { ComputedTrace as ComputedTraceType } from "@/types";

const trace: ComputedTraceType = {
  type: "computed",
  label: "Total Liquidation Preference — Series H",
  value: "$4,598,942",
  formula: "Issue Price × Shares Outstanding",
  expression: "$4.34 × 1,059,664 = $4,598,941.76",
  inputs: ["issuePrice.seriesH"],
};

describe("ComputedTrace", () => {
  it("renders the formula text", () => {
    render(<ComputedTrace trace={trace} onViewInDoc={jest.fn()} />);
    expect(screen.getByText("Issue Price × Shares Outstanding")).toBeInTheDocument();
  });

  it("expands an input card when clicked", async () => {
    const user = userEvent.setup();
    render(<ComputedTrace trace={trace} onViewInDoc={jest.fn()} />);
    await user.click(screen.getByRole("button", { name: /original issue price/i }));
    expect(screen.getByRole("button", { name: /view in document/i })).toBeInTheDocument();
  });
});
