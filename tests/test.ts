import { assert } from "chai";
import {
	add,
	churchEncode,
	churchDecode,
	multiply,
} from "../lib/index";

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
	it ("appears to be commutative", () => {
		const [c2, c3] = [2, 3].map(churchEncode);
		assert.equal(
			churchDecode(multiply(c2, c3)),
			churchDecode(multiply(c3, c2))
		);
	});
	it ("appears to be associative", () => {
		const [c2, c3, c4] = [2, 3, 4].map(churchEncode);
		const lhs = multiply(multiply(c2, c3), c4);
		const rhs = multiply(multiply(c4, c3), c2);
		assert.equal(churchDecode(lhs), churchDecode(rhs));
	});
	it ("appears to be have identity property", () => {
		const i = churchEncode(1);
		const c2 = churchEncode(2);
		assert.equal(
			churchDecode(c2),
			churchDecode(multiply(c2, i))
		);
	});
});
