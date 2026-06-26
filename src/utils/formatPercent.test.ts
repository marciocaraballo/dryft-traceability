import { formatPercent } from "@/utils/formatPercent";

describe("formatPercent", () => {
  it("formats zero", () => {
    expect(formatPercent(0)).toBe("0.00%");
  });

  it("appends percent sign", () => {
    expect(formatPercent(9.76)).toBe("9.76%");
  });

  it("rounds to two decimal places", () => {
    expect(formatPercent(54.9)).toBe("54.90%");
  });

  it("handles 100%", () => {
    expect(formatPercent(100)).toBe("100.00%");
  });
});
