/**
 * dynamic-error main module containing the DynamicError class
 */

import { ExtendableError } from "ts-error";
const defineProperty = require("ts-error/lib/helpers").defineProperty;

// A placeholder string for the error message
const placeholder = "xxxxxx-xxxxxx-xxxxxx";

export abstract class DynamicError extends ExtendableError {
    private stackWithPlaceholder: string;

    constructor(initFn: () => void = () => { }) {
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

    // The abstract method that generates the error message dynamically from the state of the error object.
    public abstract errorMessage(): string;

    // The update() method regenerates the message and stack trace using the dynamic message generated from the current state of the error object.
    protected update() {
        // Generate the message
        const message = this.errorMessage();
        // Set the message
        this.message = message;
        // Replace the stack trace with the placeholder stack trace where the new error message has been inserted.
        this.stack = this.stackWithPlaceholder!.replace(placeholder, message);
    }
}

export default DynamicError;
