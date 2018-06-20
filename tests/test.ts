import { assert } from "chai";
import { churchEncode } from "../lib/index";

describe("Church encoding", () => {
	it ("it applies function n times", () => {
		const addOne = (x: number): number => x + 1;
		const n = 5;
		assert.equal(churchEncode(5)(addOne)(1), 6);

		const double = (x: number): number => x * 2;
		assert.equal(churchEncode(10)(double)(1), 1024);
	});
});
