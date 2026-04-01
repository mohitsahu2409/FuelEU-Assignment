process.env.NODE_ENV = "test";
import { describe, it, expect } from "@jest/globals";

const TARGET = 89.3368;

const computeCB = (ghg: number, fuel: number) => {
  const energy = fuel * 41000;
  return (TARGET - ghg) * energy;
};

describe("Compliance Balance Calculation", () => {
  it("should return positive CB for low emissions", () => {
    const cb = computeCB(88, 4800);
    expect(cb).toBeGreaterThan(0);
  });

  it("should return negative CB for high emissions", () => {
    const cb = computeCB(95, 5000);
    expect(cb).toBeLessThan(0);
  });
});
