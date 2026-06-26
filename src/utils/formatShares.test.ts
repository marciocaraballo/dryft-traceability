import { formatShares } from "@/utils/formatShares";

describe("formatShares", () => {
  it("formats zero", () => {
    expect(formatShares(0)).toBe("0");
  });

  it("formats a small number without separator", () => {
    expect(formatShares(999)).toBe("999");
  });

  it("formats a number over 1000 with comma", () => {
    expect(formatShares(1059664)).toBe("1,059,664");
  });

  it("formats a number in the millions", () => {
    expect(formatShares(5959323)).toBe("5,959,323");
  });
});
