

import { describe, it, expect } from "vitest";
import { isFutureDate } from "../utils/dateUtils";

describe("Date Validation Tests", () => {

  it("should return true for future date", () => {
    const future = new Date();
    future.setDate(future.getDate() + 1);

    expect(isFutureDate(future)).toBe(true);
  });

  it("should return false for past date", () => {
    const past = new Date();
    past.setDate(past.getDate() - 1);

    expect(isFutureDate(past)).toBe(false);
  });

});

//# npm install -D vitest @testing-library/react
//# 🔥 Updated package.json
//! Add:
// "scripts": {
//   "test": "vitest"
// }

//# npm run test
