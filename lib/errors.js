module.exports = {
    ValidationError: class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    },

    AssertionError: class AssertionError extends Error {
        constructor(message) {
            super(message);
            this.name = "AssertionError";
        }
    },
}