/**
 * dynamic-error main module containing the DynamicError class
 */
import { ExtendableError } from "ts-error";
export declare abstract class DynamicError extends ExtendableError {
    private stackWithPlaceholder;
    constructor(initFn?: () => void);
    abstract errorMessage(): string;
    protected update(): void;
}
export default DynamicError;
