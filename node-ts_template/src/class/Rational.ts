/**
 * 請參考 human.ts 的語法完成 Rational 類
 */
export class Rational {
    // todo: ...
    private numerator: number;
    private denominator: number;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }

    public getNumerator(): number {
        return this.numerator;
    }

    public getDenominator(): number {
        return this.denominator;
    }

    public normalize(): Rational {
        const gcd = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
        return new Rational(this.numerator / gcd, this.denominator / gcd);
    }

    public isWhole(): boolean {
        return this.numerator % this.denominator === 0;
    }

    public isDecimal(): boolean {
        return this.numerator % this.denominator !== 0;
    }

    public equals(param1: number | Rational, param2?: number): boolean {
        let other: Rational;
        
        if (param1 instanceof Rational) {
            other = param1.normalize();
        } else if (typeof param1 === 'number' && typeof param2 === 'number') {
            other = new Rational(param1, param2).normalize();
        } else {
            throw new Error("Invalid parameters for equals method");
        }

        const normalized = this.normalize();
        return normalized.numerator === other.numerator && 
               normalized.denominator === other.denominator;
    }

    public static _parseRational(chars1: string[], chars2: string[]): Rational {
        const numerator = parseInt(chars1.join(''));
        const denominator = parseInt(chars2.join(''));
        return new Rational(numerator, denominator);
    }

    public static parseRational(input: string): Rational {
        const parts = input.split('/');
        if (parts.length !== 2) {
            throw new Error("Invalid input format. Expected format: 'numerator/denominator'");
        }
        const numerator = parseInt(parts[0]);
        const denominator = parseInt(parts[1]);
        return new Rational(numerator, denominator);
    }

    private gcd(a: number, b: number): number {
        if (b === 0) return a;
        return this.gcd(b, a % b);
    }

    public toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }
}
