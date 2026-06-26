jest.mock("@/data/coiDocument.json", () => ({
  docId: "coi-test",
  title: "Certificate of Incorporation",
  company: "HELIOS BIOSCIENCE INC.",
  date: "January 22, 2026",
  totalPages: 2,
  pages: [
    { page: 1, text: "This is page one of the document." },
    { page: 2, text: 'The "Original Issue Price" of the Series H Preferred Stock is $4.34.' },
  ],
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DocumentReader } from "@/components/DocumentReader";

describe("DocumentReader", () => {
  it("renders the close button", () => {
    render(
      <DocumentReader
        page={2}
        match="Original Issue Price"
        onClose={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(
      <DocumentReader
        page={2}
        match="Original Issue Price"
        onClose={onClose}
      />
    );
    await user.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders a sidebar navigation button per page in the document", () => {
    render(
      <DocumentReader
        page={2}
        match="Original Issue Price"
        onClose={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /1.*this is page one/i })).toBeInTheDocument();
  });
});
