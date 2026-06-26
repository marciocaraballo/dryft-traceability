import { render, screen } from "@testing-library/react";
import { Field } from "@/components/Field";

describe("Field", () => {
  it("renders the label", () => {
    render(<Field label="LP Rank">Senior</Field>);
    expect(screen.getByText("LP Rank")).toBeInTheDocument();
  });

  it("renders the value", () => {
    render(<Field label="LP Rank">Senior to all prior series</Field>);
    expect(screen.getByText("Senior to all prior series")).toBeInTheDocument();
  });
});
