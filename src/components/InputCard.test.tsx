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
  pages: [{ page: 17, text: 'The Original Issue Price of Series H is $4.34.' }],
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputCard } from "@/components/InputCard";

describe("InputCard", () => {
  it("renders a toggle button with the trace label", () => {
    render(
      <InputCard
        inputKey="issuePrice.seriesH"
        isExpanded={false}
        onToggle={jest.fn()}
        onViewInDoc={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /original issue price/i })).toBeInTheDocument();
  });

  it("calls onToggle when the card header is clicked", async () => {
    const onToggle = jest.fn();
    const user = userEvent.setup();
    render(
      <InputCard
        inputKey="issuePrice.seriesH"
        isExpanded={false}
        onToggle={onToggle}
        onViewInDoc={jest.fn()}
      />
    );
    await user.click(screen.getByRole("button", { name: /original issue price/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("shows the document excerpt when expanded", () => {
    render(
      <InputCard
        inputKey="issuePrice.seriesH"
        isExpanded={true}
        onToggle={jest.fn()}
        onViewInDoc={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /view in document/i })).toBeInTheDocument();
  });
});
