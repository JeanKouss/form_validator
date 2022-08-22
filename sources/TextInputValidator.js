/**
 * Validator for to limit an input length.
 * (Not for textarea)
 */
class TextInputValidator extends InputValidator{
    /**
     *  
     * @param {number} min 
     * @param {number} max 
     */
    constructor(inputElem, output, min=0, max=524288) {
        if(inputElem.tagName!="TEXTEREA") {
            super(inputElem, output);
            this.minLen = min;
            this.maxLen = max;
        } else {
            console.error("TextInputValidator must not be used on textarea");
        }
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

    verify() {
        if(this.input.value.length<this.minLen || this.input.value.length>this.maxLen) {
            return new InputError(this, 2, 0); // [errorCode, priority]
        }
        return new InputError(this, 0, 0);
    }

    
}