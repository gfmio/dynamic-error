/**
 * ES tests (for node.js)
 */

// tslint:disable:no-implicit-dependencies no-submodule-imports max-classes-per-file

import * as chai from "chai";
import "mocha";

const expect = chai.expect;

import { DynamicError } from "../lib/index";
import { ExtendableError } from "ts-error";

class ValueError<T> extends DynamicError {
    protected value: T;

    constructor(value: T) {
        super(function () {
            this.value = value;
        });
    }

    public errorMessage() {
        return `The value ${this.value} is invalid.`;
    }

    public updateValue(value: T) {
        this.value = value;
        this.update();
    }
}

class NumberValueError extends ValueError<number> {
    public errorMessage() {
        return `The number ${this.value} is invalid.`;
    }
}

const errorValue = -1;
const errorValue2 = NaN;
const valueError = new ValueError(errorValue);
const numberValueError = new NumberValueError(errorValue);

// Tests

describe("CJS: A ValueError", () => {
    it("should be instance of Error", () => {
        expect(valueError instanceof Error).to.equal(true);
    });
    it("should be instance of ExtendableError", () => {
        expect(valueError instanceof ExtendableError).to.equal(true);
    });
    it("should be instance of DynamicError", () => {
        expect(valueError instanceof DynamicError).to.equal(true);
    });
    it("should be instance of ValueError", () => {
        expect(valueError instanceof ValueError).to.equal(true);
    });
    it("should be instance of ValueError", () => {
        expect(valueError instanceof ValueError).to.equal(true);
    });
    it("should not be instance of CustomError", () => {
        expect(valueError instanceof NumberValueError).to.equal(false);
    });
    it("should have the name \"ValueError\"", () => {
        expect(valueError.name).to.equal("ValueError");
    });
    it("should have a stack trace starting with its name", () => {
        expect(valueError.stack!.startsWith(valueError.name)).to.equal(true);
    });
    it("should have a string representation starting with its name", () => {
        expect(valueError.toString().startsWith(valueError.name)).to.equal(true);
    });
    it("should have the dynamically calculated message property", () => {
        expect(valueError.message).to.equal(`The value ${errorValue} is invalid.`);

        valueError.updateValue(errorValue2);
    });
    it("should have the new dynamically calculated message property after update() is called", () => {
        expect(valueError.message).to.equal(`The value ${errorValue2} is invalid.`);
    });
});

describe("CJS: A NumberValueError", () => {
    it("should be instance of Error", () => {
        expect(numberValueError instanceof Error).to.equal(true);
    });
    it("should be instance of ExtendableError", () => {
        expect(numberValueError instanceof ExtendableError).to.equal(true);
    });
    it("should be instance of DynamicError", () => {
        expect(numberValueError instanceof DynamicError).to.equal(true);
    });
    it("should be instance of ValueError", () => {
        expect(numberValueError instanceof ValueError).to.equal(true);
    });
    it("should be instance of NumberValueError", () => {
        expect(numberValueError instanceof NumberValueError).to.equal(true);
    });
    it("should have the name \"NumberValueError\"", () => {
        expect(numberValueError.name).to.equal("NumberValueError");
    });
    it("should have a stack trace starting with its name", () => {
        expect(numberValueError.stack!.startsWith(numberValueError.name)).to.equal(true);
    });
    it("should have a string representation starting with its name", () => {
        expect(numberValueError.toString().startsWith(numberValueError.name)).to.equal(true);
    });
    it("should have the dynamically calculated message property", () => {
        expect(numberValueError.message).to.equal(`The number ${errorValue} is invalid.`);

        numberValueError.updateValue(errorValue2);
    });
    it("should have the new dynamically calculated message property after update() is called", () => {
        expect(numberValueError.message).to.equal(`The number ${errorValue2} is invalid.`);
    });
});
