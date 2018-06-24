export interface Lambda {
	(n: number): number;
}

export interface ChurchNumeral {
	(f: Lambda): Lambda;
}

/**
 * Encode number into church numeral
 *
 * Examples
 * 0 : x
 * 1: f(x)
 * 2: f(f(x))
 * ...
 */
export const churchEncode = (n: number): ChurchNumeral => {
	return (f: Lambda): Lambda => {
		return (x: number): number => {
			if (n === 0) return x;

			return f(churchEncode(n-1)(f)(x));
		}
	};
};

const increment: Lambda = x => x + 1;

/**
 * To get back the number of applications, we count from 0
 * each time the function is applied
 */
export const churchDecode = (f: ChurchNumeral): number => f(increment)(0);

export interface ChurchFunction {
	(a: ChurchNumeral, b: ChurchNumeral): ChurchNumeral;
}

/**
 * Adding two church numerals A, B means applying the function A+B times
 */
export const add: ChurchFunction = (a, b) => {
	return (f: Lambda): Lambda => {
		return (x: number): number => a(f)(b(f)(x));
	};
};

export const multiply: ChurchFunction = (a, b) => {
	return (f: Lambda): Lambda => {
		return (x: number): number => a(b(f))(x);
	};
};
 
export const successor = (a: ChurchNumeral): ChurchNumeral => {
	return (f: Lambda): Lambda => {
		return (x: number): number => {
			// add(C1, a)
			// => C1(f)(a(f)(x));
			// C1 of f is just f (i.e. C1 = f(x) or f applied once)
			return f(a(f)(x));
		};
	};
};
