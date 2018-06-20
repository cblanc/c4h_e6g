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
