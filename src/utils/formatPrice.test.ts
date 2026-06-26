import { formatPrice } from "@/utils/formatPrice";

describe("formatPrice", () => {
  it("formats zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("prepends dollar sign", () => {
    expect(formatPrice(4.34)).toBe("$4.34");
  });

  it("rounds to two decimal places", () => {
    expect(formatPrice(19.07)).toBe("$19.07");
  });

  it("formats a whole number with cents", () => {
    expect(formatPrice(5)).toBe("$5.00");
  });
});
