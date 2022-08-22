/**
 * Extends from class TextInputValidator
 * Specific to input[type='password']
 */
class PasswordInputValidator extends TextInputValidator{

    /**
     * 
     * @param {HTMLInputElement} inputElem 
     * @param {ErrorOutput} output 
     * @param {number} min 
     * @param {number} max 
     */
    constructor(inputElem, output, min=6, max=524288) {
        super(inputElem,output, min, max);
    }

    verify() {
        if(this.input.value.length<this.minLen) {
            return new InputError(this, 3, 1); // [errorCode, priority]
        }
        return new InputError(this, 0, 0);
    }
}