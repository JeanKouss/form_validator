/**
 * Validator for to limit an input length.
 * (Not for textarea)
 */
class TextInputValidator {
    /**
     * 
     * @param {HTMLInputElement} inputElem 
     * @param {ErrorOutput} output 
     * @param {number} min 
     * @param {number} max 
     */
    constructor(inputElem, output, min=0, max=524288) {
        this.input = inputElem;
        this.output = output;
        this.minLen = min;
        this.maxLen = max;
    }

    /**
     * Set min and mac length of the input
     * @param {number} minLength 
     * @param {number} maxLength 
     */
    setMinMax(minLength, maxLength) {
        this.minLen = minLength;
        this.maxLen = maxLength;
    }

    /**
     * Makes verifications and return the error.
     * @returns {Array<number>} [errorCode, priority]; [0,0] if no error is founded
     */
    verify() {
        if(this.input.value.length<this.minLen || this.input.value.length>this.maxLen) {
            return [2, 0]; // [errorCode, priority]
        }
        return [0,0];
    }

    /**
     * Call this.verify() and signal the error to the output.
     */
    validate() {
        let verification = this.verify();
        this.output.signalError(this.input, verification[0], verification[1]);
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