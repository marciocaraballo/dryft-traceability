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
import { TracePanel } from "@/components/TracePanel";

describe("TracePanel", () => {
  it("renders the close button", () => {
    render(
      <TracePanel traceKey="issuePrice.seriesH" onClose={jest.fn()} onViewInDoc={jest.fn()} />
    );
    expect(screen.getByRole("button", { name: /close panel/i })).toBeInTheDocument();
  });

  it("renders nothing when the traceKey is not in the registry", () => {
    const { container } = render(
      <TracePanel traceKey="unknown.key" onClose={jest.fn()} onViewInDoc={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(
      <TracePanel traceKey="issuePrice.seriesH" onClose={onClose} onViewInDoc={jest.fn()} />
    );
    await user.click(screen.getByRole("button", { name: /close panel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
