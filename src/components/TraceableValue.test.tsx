jest.mock("@/data/traces.json", () => ({
  "issuePrice.seriesH": {
    type: "stated",
    label: "Original Issue Price — Series H",
    value: "$4.34",
    source: { docId: "coi-helios", page: 17, match: "Original Issue Price" },
  },
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TraceableValue } from "@/components/TraceableValue";

describe("TraceableValue", () => {
  it("renders as a button", () => {
    render(
      <TraceableValue traceId="issuePrice.seriesH" onTrace={jest.fn()}>
        $4.34
      </TraceableValue>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onTrace with the traceId when clicked", async () => {
    const onTrace = jest.fn();
    const user = userEvent.setup();
    render(
      <TraceableValue traceId="issuePrice.seriesH" onTrace={onTrace}>
        $4.34
      </TraceableValue>
    );
    await user.click(screen.getByRole("button"));
    expect(onTrace).toHaveBeenCalledWith("issuePrice.seriesH");
  });
});
