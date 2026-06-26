jest.mock("@/data/coiDocument.json", () => ({
  title: "Amended and Restated Certificate of Incorporation",
  company: "HELIOS BIOSCIENCE INC.",
  pages: [{ page: 17, text: "The Original Issue Price is $4.34." }],
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SourceCard } from "@/components/SourceCard";

describe("SourceCard", () => {
  it("renders the View in document button", () => {
    render(
      <SourceCard
        page={17}
        text="The Original Issue Price is $4.34."
        match="Original Issue Price"
        onViewInDoc={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /view in document/i })).toBeInTheDocument();
  });

  it("calls onViewInDoc with page and match when button is clicked", async () => {
    const onViewInDoc = jest.fn();
    const user = userEvent.setup();
    render(
      <SourceCard
        page={17}
        text="The Original Issue Price is $4.34."
        match="Original Issue Price"
        onViewInDoc={onViewInDoc}
      />
    );
    await user.click(screen.getByRole("button", { name: /view in document/i }));
    expect(onViewInDoc).toHaveBeenCalledWith(17, "Original Issue Price");
  });
});
