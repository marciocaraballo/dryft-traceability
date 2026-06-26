jest.mock("@/data/coiDocument.json", () => ({
  docId: "coi-test",
  title: "Certificate of Incorporation",
  company: "HELIOS BIOSCIENCE INC.",
  date: "January 22, 2026",
  totalPages: 1,
  pages: [{ page: 17, text: 'The "Original Issue Price" of the Series H Preferred Stock is $4.34.' }],
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StatedTrace } from "@/components/StatedTrace";
import type { StatedTrace as StatedTraceType } from "@/types";

const trace: StatedTraceType = {
  type: "stated",
  label: "Original Issue Price — Series H",
  value: "$4.34",
  source: {
    docId: "coi-helios",
    page: 17,
    match: 'the "Original Issue Price" of the Series H Preferred Stock is $4.34',
  },
};

describe("StatedTrace", () => {
  it("renders the View in document button", () => {
    render(<StatedTrace trace={trace} onViewInDoc={jest.fn()} />);
    expect(screen.getByRole("button", { name: /view in document/i })).toBeInTheDocument();
  });

  it("calls onViewInDoc with the correct page when button is clicked", async () => {
    const onViewInDoc = jest.fn();
    const user = userEvent.setup();
    render(<StatedTrace trace={trace} onViewInDoc={onViewInDoc} />);
    await user.click(screen.getByRole("button", { name: /view in document/i }));
    expect(onViewInDoc).toHaveBeenCalledWith(17, trace.source.match);
  });
});
