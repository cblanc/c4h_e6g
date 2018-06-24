import { assert } from "chai";
import {
	add,
	churchEncode,
	churchDecode,
	ChurchFunction,
	ChurchNumeral,
	Lambda,
	multiply,
} from "../lib/index";

const c = churchEncode;

const churchEqual = (a: ChurchNumeral, b: ChurchNumeral): void => {
	assert.equal(churchDecode(a), churchDecode(b));
};

describe("Church encoding", () => {
	it ("it applies function n times", () => {
		const addOne: Lambda = x => x + 1;
		const n = 5;
		assert.equal(churchEncode(5)(addOne)(1), 6);

		const double: Lambda = x => x * 2;
		assert.equal(churchEncode(10)(double)(1), 1024);
	});
});

describe("Church decoding", () => {
	it ("retrieves a number from a Church Numeral", () => {
		const n = 5;
		assert.equal(churchDecode(c(n)), n);
	});
});

interface PropertyCheckParams {
	method: ChurchFunction,
	identity: ChurchNumeral,
}

const checkProperties = (o: PropertyCheckParams) => {
	const { method, identity } = o;
	return () => {
		it ("appears to be commutative", () => {
			churchEqual(
				method(c(2), c(3)),
				method(c(3), c(2))
			);
		});

		it ("appears to be associative", () => {
			const lhs = method(method(c(2), c(3)), c(4));
			const rhs = method(method(c(4), c(3)), c(2));
			churchEqual(lhs, rhs);
		});

		it ("appears to be have identity property", () => {
			churchEqual(c(2), method(c(2), identity));
		});
	};
};

describe("add", () => {
	it ("adds two church numerals", () => {
		churchEqual(
			add(c(8), c(9)),
			c(17)
		);
	});

	const method = add;
	const identity = c(0);
	describe("operation properties", checkProperties({ method, identity }));
});

describe("multiply", () => {
	it ("adds two church numerals", () => {
		churchEqual(
			multiply(c(3), c(2)),
			c(6)
		);
	});

	const method = multiply;
	const identity = c(1);
	describe("operation properties", checkProperties({ method, identity }));
});
