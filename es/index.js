"use strict";
/**
 * dynamic-error main module containing the DynamicError class
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ts_error_1 = require("ts-error");
const defineProperty = require("ts-error/lib/helpers").defineProperty;
// A placeholder string for the error message
const placeholder = "xxxxxx-xxxxxx-xxxxxx";
class DynamicError extends ts_error_1.ExtendableError {
    constructor(initFn = () => { }) {
        // We call the constructor with a placeholder string because the dynamic property values
        // can only be set after the super() call is complete
        super(placeholder);
        // This value contains the generated stack trace including the placeholder string.
        // We need to save it in the object to regenerate the new stack trace with the correct dynamic message,
        // if the error is mutable and the update() method has been called.
        defineProperty(this, "stackWithPlaceholder", {
            configurable: false,
            enumerable: false,
            value: this.stack,
            writable: false,
        });
        // Now that this is initialised we can call the init function argument with this
        initFn.bind(this)();
        // Finally, we update the error object which generates the message and
        // stack trace with the correct dynamic values
        this.update();
    }
    // The update() method regenerates the message and stack trace using the dynamic message generated from the current state of the error object.
    update() {
        // Generate the message
        const message = this.errorMessage();
        // Set the message
        this.message = message;
        // Replace the stack trace with the placeholder stack trace where the new error message has been inserted.
        this.stack = this.stackWithPlaceholder.replace(placeholder, message);
    }
}
exports.DynamicError = DynamicError;
exports.default = DynamicError;
//# sourceMappingURL=index.js.map