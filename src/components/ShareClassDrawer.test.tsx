jest.mock("@/data/traces.json", () => ({
  "issuePrice.seriesH": {
    type: "stated",
    label: "Original Issue Price — Series H",
    value: "$4.34",
    source: { docId: "coi-helios", page: 17, match: "Original Issue Price" },
  },
  "liqPref.seriesH": {
    type: "computed",
    label: "Total Liquidation Preference — Series H",
    value: "$4,598,942",
    formula: "Issue Price × Shares Outstanding",
    expression: "$4.34 × 1,059,664 = $4,598,941.76",
    inputs: ["issuePrice.seriesH"],
  },
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShareClassDrawer } from "@/components/ShareClassDrawer";
import type { ShareClassRow, DrawerData } from "@/types";

const row: ShareClassRow = {
  id: "seriesH",
  name: "Series H Preferred Stock",
  sharesOutstanding: 1059664,
  conversionRatio: 1.0,
  asIfConverted: 1059664,
  fullyDilutedPct: 9.76,
  issuePrice: 4.34,
};

const drawer: DrawerData = {
  lpRank: "Senior to all prior series",
  lpMultiple: "1.0x",
  participation: "Non-participating",
  participationCap: null,
  dividendRate: "8.00% non-cumulative",
  issueDate: "Jan 22, 2026",
  conversionRatio: "1.0000",
  liqPrefPerShare: "$4.34",
  totalLiqPref: "$4,598,942",
  traceIds: { issuePrice: "issuePrice.seriesH", totalLiqPref: "liqPref.seriesH" },
};

describe("ShareClassDrawer", () => {
  it("renders the close button", () => {
    render(
      <ShareClassDrawer
        row={row}
        drawer={drawer}
        activeTraceId={null}
        onTrace={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByRole("button", { name: /close drawer/i })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    render(
      <ShareClassDrawer
        row={row}
        drawer={drawer}
        activeTraceId={null}
        onTrace={jest.fn()}
        onClose={onClose}
      />
    );
    await user.click(screen.getByRole("button", { name: /close drawer/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders the series name in the header", () => {
    render(
      <ShareClassDrawer
        row={row}
        drawer={drawer}
        activeTraceId={null}
        onTrace={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText("Series H Preferred Stock")).toBeInTheDocument();
  });
});
