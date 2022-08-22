/**
 * This class manages the output of the errors.
 */
class ErrorOutput {
    /**
     * @param {Element} htmlElem  The HTML element in which the error message will ge written
     */
    constructor(htmlElem) {
        this.htmlElement = htmlElem;
        this.curError = new InputError(null, 0, 0);

        this.deferedErrorsList = []; // List of the inputs that are not correct.
        // The role of this last one is in case of one ErrorOutput is assign to multiple inputs
        // to memorize an input that user had not validated and signal it after other are corrected.
    }

    /**
     * Compute the received error to output the 
     * most prioritized and recent error between the the signaled one and the memorizedErrorsList.
     * @param {InputError} error 
     */
    signalError(error) {

        this.setCurrentErrorTo(error);
    }

    delFromDefered(error) {
        let index = this.isOriginInDefErr(error);
        if(index>=0) {

        }
    }

    /**
     * Verify if an error with the same origin as the one take as parameter is in deferedErrorsList
     * @param {*} error 
     * @returns 
     */
    isOriginInDefErr(error) {
        for (let i = 0; i < this.deferedErrorsList.length; i++) {
            if(this.deferedErrorsList[i].origin == error.origin) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Set current ErrorOutput proprieties to those parameters if they are prioritized and out put the error message in the HTMLElement.
     * !!This method is not appropriate if many validators are using the same output.
     * !!DO NOT CALL THIS DIRECTLY. Call the signalError method instead.
     * @param {InputError} error 
     */
    setCurrentErrorTo(error) {
        this.curError.origin = error.origin;
        this.curError.priority = error.priority;
        this.curError.code = error.code;
        this.htmlElement.innerHTML = InputError.getErrorMsg(this.curError.code);
        console.log(this.curError.origin.input);
    }

    
}