import { render, screen } from "@testing-library/react";
import { CalcRow } from "@/components/CalcRow";

describe("CalcRow", () => {
  it("renders the row label", () => {
    render(
      <table>
        <tbody>
          <CalcRow label="Liquidation Preference" perShare="$4.34" total="$4,598,942" />
        </tbody>
      </table>
    );
    expect(screen.getByText("Liquidation Preference")).toBeInTheDocument();
  });

  it("renders the per-share value", () => {
    render(
      <table>
        <tbody>
          <CalcRow label="Liquidation Preference" perShare="$4.34" total="$4,598,942" />
        </tbody>
      </table>
    );
    expect(screen.getByText("$4.34")).toBeInTheDocument();
  });

  it("renders the total value", () => {
    render(
      <table>
        <tbody>
          <CalcRow label="Liquidation Preference" perShare="$4.34" total="$4,598,942" />
        </tbody>
      </table>
    );
    expect(screen.getByText("$4,598,942")).toBeInTheDocument();
  });
});
