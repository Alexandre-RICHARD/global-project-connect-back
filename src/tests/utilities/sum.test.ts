import {
    describe, test, expect, expectTypeOf
} from "vitest";
import {sum} from "../../utilities/sum";

describe("Sum function", () => {
    test("Add 2 numbers and get correct result", () => {
        expect(sum(1, 4)).toEqual(5);
    });

    test("Correct use of the sum fonction", () => {
        expectTypeOf(sum).toBeFunction();
        expect(() => sum(1, 2)).not.toThrow();
        expect(sum(0, 0)).toBe(0);
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    });
});
