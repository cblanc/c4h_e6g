import { assert } from "chai";
import { churchEncode, churchDecode, add, multiply } from "../lib/index";

describe("Church encoding", () => {
	it ("it applies function n times", () => {
		const addOne = (x: number): number => x + 1;
		const n = 5;
		assert.equal(churchEncode(5)(addOne)(1), 6);

		const double = (x: number): number => x * 2;
		assert.equal(churchEncode(10)(double)(1), 1024);
	});
});

describe("Church decoding", () => {
	it ("retrieves a number from a Church Numeral", () => {
		const n = 5;
		assert.equal(churchDecode(churchEncode(n)), n);
	});
});

describe("add", () => {
	it ("adds two church numerals", () => {
		const result = add(churchEncode(8), churchEncode(9));
		assert.equal(churchDecode(result), 17);
	});
});

describe("multiply", () => {
	it ("adds two church numerals", () => {
		const result = multiply(churchEncode(3), churchEncode(2));
		assert.equal(churchDecode(result), 6);
	});
});
