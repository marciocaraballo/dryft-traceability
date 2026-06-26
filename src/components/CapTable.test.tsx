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
import { CapTable } from "@/components/CapTable";
import type { ShareClassRow } from "@/types";

const rows: ShareClassRow[] = [
  {
    id: "seriesH",
    name: "Series H Preferred Stock",
    sharesOutstanding: 1059664,
    conversionRatio: 1.0,
    asIfConverted: 1059664,
    fullyDilutedPct: 9.76,
    issuePrice: 4.34,
    traceIds: { issuePrice: "issuePrice.seriesH" },
  },
];

describe("CapTable", () => {
  it("renders the table", () => {
    render(
      <CapTable
        rows={rows}
        selectedId={null}
        activeTraceId={null}
        onRowClick={jest.fn()}
        onTrace={jest.fn()}
      />
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("renders a row expand button for each data row", () => {
    render(
      <CapTable
        rows={rows}
        selectedId={null}
        activeTraceId={null}
        onRowClick={jest.fn()}
        onTrace={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /series h preferred stock/i })).toBeInTheDocument();
  });

  it("calls onRowClick with the row id when the name button is clicked", async () => {
    const onRowClick = jest.fn();
    const user = userEvent.setup();
    render(
      <CapTable
        rows={rows}
        selectedId={null}
        activeTraceId={null}
        onRowClick={onRowClick}
        onTrace={jest.fn()}
      />
    );
    await user.click(screen.getByRole("button", { name: /series h preferred stock/i }));
    expect(onRowClick).toHaveBeenCalledWith("seriesH");
  });
});
