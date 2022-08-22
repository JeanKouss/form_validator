/**
 * Base class for InputValidator
 */
class InputValidator {
    /**
     * 
     * @param {HTMLInputElement} inputElem 
     * @param {ErrorOutput} output 
     */
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }

    /**
     * setter
     * @param {HTMLInputElement} input
     */
    setInput(input) {
        this.input = input;
    }
    /**
     * setter
     * @param {ErrorOutput} output 
     */
    setOutput(output) {
        this.output = output;
    }

    /**
     * Makes verifications and return the error.
     * @returns {InputError}
     */
    verify() {
        return new InputError(this, 0, 0);
    }

    validate() {
        let error = this.verify();
        this.output.signalError(error);
    }

    /**
     * Makes validation occures after each input.
     * (Just call this.validate() on each input)
     */
     validateOnInput() {
        this.input.addEventListener('input', (event)=>{
            this.validate();
        });
    }
}