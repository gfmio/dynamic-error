# dynamic-error

**TL/DR: A dynamic error class with support for TypeScript, ES6, and old-style JavaScript supporting even very old browsers.**

This package provides the abstract class `DynamicError`. You can use it define error classes, that compute their error message dynamically from the internal state of the error object. For example, you can define an `InvalidValueError<T>` that takes a `value` argument in its constructor and computes the error message as you wish. It is derived from `ExtendableError` from my `[ts-error](https://github.com/gfmio/ts-error)` package, which enables the proper inheritance hierarchy (subclassing `Error` normally does not work properly in JS).

The package is well-tested, very small and only has one production dependency (ts-error), which itself has no production dependencies.

## Install

You can install the [dynamic-error package](https://www.npmjs.com/package/dynamic-error) from NPM with the command:

```sh
npm install dynamic-error
```

If you're using TypeScript, you will also need the `@types/node` dev dependency (unless you have type checking disabled).

```sh
npm install --save-dev @types/node
```

## Usage

You subclass `DynamicError`, call `super()` in the constructor, define the method `errorMessage()` and then you can use your new error class in your code. If you want to pass state parameters to the constructor, you must call `super` with a function argument, in which you can set the state of your error object (this is due to the JS quirks with Error objects).

In TypeScript:

```ts
import { DynamicError } from "dynamic-error";

// A subclass of DynamicError, here also using generics.
class ValueError<T> extends DynamicError {
    protected value: T;

    constructor(value: T) {
        // You need to use function(){} here and not arrow notation, because of `this`, which is not supported by arrow functions.
        super(function () {
          this.value = value;
        });
    }

    public errorMessage() {
        return `The value ${this.value} is invalid.`;
    }

    // This method is not required, but I use it to demonstrate dynamic recalculation.
    public updateValue(value: T) {
        this.value = value;
        // this.update() recomputes the error message and stack trace.
        // The stack trace remains the same it was at error creation, only the message in the stack trace is updated.
        this.update();
    }
}

// Another subclass
class NumberValueError extends ValueError<number> {
    public errorMessage() {
        return `The number ${this.value} is invalid.`;
    }
}

try {
    throw new NumberValueError(-1);
    throw new ValueError("abc");
} catch (e) {
    if (e instanceof NumberValueError) {
        // ...
    } else {
        // ...
    }
}
```

In ES6 / esnext:

```js
import { DynamicError } from "dynamic-error";

// A subclass of DynamicError
class ValueError extends DynamicError {
    constructor(value) {
        // You need to use function(){} here and not arrow notation, because of `this`, which is not supported by arrow functions.
        super(function () {
          this.value = value;
        });
    }

    errorMessage() {
        return `The value ${this.value} is invalid.`;
    }

    // This method is not required, but I use it to demonstrate dynamic recalculation.
    updateValue(value) {
        this.value = value;
        // this.update() recomputes the error message and stack trace.
        // The stack trace remains the same it was at error creation, only the message in the stack trace is updated.
        this.update();
    }
}

// Another subclass
class NumberValueError extends ValueError {
    public errorMessage() {
        return `The number ${this.value} is invalid.`;
    }
}

try {
    throw new NumberValueError(-1);
    throw new ValueError("abc");
} catch (e) {
    if (e instanceof NumberValueError) {
        // ...
    } else {
        // ...
    }
}
```

In ES5:

```js
var DynamicError = require("dynamic-error").DynamicError;

// This is taken from TypeScript compiler output, because it works quite reliably.
// There are various other methods though, so use whatever you like, if you have to use ES5.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ValueError = /** @class */ (function (_super) {
    __extends(ValueError, _super);
    function ValueError(value) {
        return _super !== null && _super.call(this, function () {
            this.value = value;
        }) || this;
    }
    ValueError.prototype.errorMessage = function () {
        return "The value " + this.value + " is invalid.";
    };
    ValueError.prototype.updateValue = function (value) {
        this.value = value;
        this.update();
    };
    return ValueError;
}(DynamicError));

var NumberValueError =  /** @class */ (function (_super) {
    __extends(NumberValueError, _super);
    function NumberValueError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberValueError.prototype.errorMessage = function () {
        return "The number " + this.value + " is invalid.";
    };
    return NumberValueError;
}(ValueError));

try {
    throw new NumberValueError(-1);
    throw new ValueError("abc");
} catch (e) {
    if (e instanceof NumberValueError) {
        // ...
    } else {
        // ...
    }
}
```

## Tests

Run `npm run test` to run the mocha/chai test suite. The ExtendableError package is well-tested in node and all browsers, including very old versions, so this Error class will be compatible even with very old and mobile browsers.

**If you encounter any issues, please file an issue and I will investigate and fix it.**

## License

MIT (see [./LICENSE](./LICENSE)).
