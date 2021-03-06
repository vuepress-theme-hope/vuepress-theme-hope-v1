import { describe, it, expect } from "vitest";
import { compareSync, hashSync } from "bcrypt-ts";

describe("bcrypt test", () => {
  it("should match", () => {
    const hash1 = hashSync("abcdefghi", 10);

    expect(compareSync("abcdefghi", hash1)).toEqual(true);
  });
});
