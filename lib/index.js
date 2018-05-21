"use strict";
/**
 * dynamic-error main module containing the DynamicError class
 */
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
exports.__esModule = true;
var ts_error_1 = require("ts-error");
var defineProperty = require("ts-error/lib/helpers").defineProperty;
// A placeholder string for the error message
var placeholder = "xxxxxx-xxxxxx-xxxxxx";
var DynamicError = /** @class */ (function (_super) {
    __extends(DynamicError, _super);
    function DynamicError(initFn) {
        if (initFn === void 0) { initFn = function () { }; }
        var _this = 
        // We call the constructor with a placeholder string because the dynamic property values
        // can only be set after the super() call is complete
        _super.call(this, placeholder) || this;
        // This value contains the generated stack trace including the placeholder string.
        // We need to save it in the object to regenerate the new stack trace with the correct dynamic message,
        // if the error is mutable and the update() method has been called.
        defineProperty(_this, "stackWithPlaceholder", {
            configurable: false,
            enumerable: false,
            value: _this.stack,
            writable: false
        });
        // Now that this is initialised we can call the init function argument with this
        initFn.bind(_this)();
        // Finally, we update the error object which generates the message and
        // stack trace with the correct dynamic values
        _this.update();
        return _this;
    }
    // The update() method regenerates the message and stack trace using the dynamic message generated from the current state of the error object.
    DynamicError.prototype.update = function () {
        // Generate the message
        var message = this.errorMessage();
        // Set the message
        this.message = message;
        // Replace the stack trace with the placeholder stack trace where the new error message has been inserted.
        this.stack = this.stackWithPlaceholder.replace(placeholder, message);
    };
    return DynamicError;
}(ts_error_1.ExtendableError));
exports.DynamicError = DynamicError;
exports["default"] = DynamicError;
//# sourceMappingURL=index.js.map