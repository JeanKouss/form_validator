/**
 * This class manages the output of the errors.
 */
class ErrorOutput {
    /**
     * @param {Element} htmlElem  The HTML element in which the error message will ge written
     */
    constructor(htmlElem) {
        this.htmlElement = htmlElem;
        this.curErrorOrigin = null; //Origin of the current displaying error
        this.curErrorCode = 0; //Code of the current displaying error
        this.curErrorPriority = 0; //Priority of the current displaying error

        this.lastInvalidInputs = []; // List of the inputs that are not correct.
        // The role of this last one is in case of one ErrorOutput is assign to multiple inputs
        // to memorize an input that user had not validated and signal it.
    }

    /**
     * Compute the received error code, origin and priority to output the 
     * most prioritized and recent error between the the signaled one and the lastInvalidInputs.
     * @param {Element} errOrigin origin of the error
     * @param {number} errCode error code
     * @param {number} priority error priority
     */
    signalError(errOrigin, errCode, priority=0) {
        if(errOrigin!=this.curErrorOrigin && this.curErrorCode!=0) { // Save the input user not validated but lefted
            this.saveInvalidInput(this.curErrorOrigin, this.curErrorCode, this.curErrorPriority);
        }
        this.delFromInvalidList(errOrigin); // Delete it from the list of invalidated if it is in.
        if(errCode==0) { // If there is no error from sender : get the latest invalidated one
            this.curErrorPriority = 0; // reset the priority to allow the next error being displayed however its priority.
            let errorToSignal = this.lastInvalidInputs[this.lastInvalidInputs.length-1];
            // console.log(this.lastInvalidInputs);
            if(errorToSignal!=null) {
                // console.log('err set to latess');
                errOrigin = errorToSignal['origin'];
                errCode = errorToSignal['code'];
                priority = errorToSignal['prior'];
            }
        }
        this.setCurrentErrorTo(errOrigin, errCode, priority);
    }

    /**
     * Returns the index of the the object whith origin is origin, or -1 if not exist
     * @param {Element} origin 
     * @returns {number}
     */
    indexInLastInvalidInputs(origin) {
        for(let i=0; i<this.lastInvalidInputs.length; i++) {
            if(this.lastInvalidInputs[i]['origin']===origin) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Add a new element to the list invalid inputs
     * @param {Element} origin Origin of the error (an Html element)
     * @param {number} errCode Error code
     * @param {number} priority Error priority
     */
    saveInvalidInput(origin, errCode, priority) {
        if(this.indexInLastInvalidInputs(origin)==-1) {
            this.lastInvalidInputs.push({
                'origin' : origin,
                'code' : errCode,
                'prior' : priority
            });
        }
    }
    
    /**
     * Verify if an object with this origin is in lastInvalidInputs, and delete it from the list
     * @param {Element} origin Origin of the error (an Html element)
     * @returns {boolean}
     */
    delFromInvalidList(origin) {
        let index = this.indexInLastInvalidInputs(origin);
        if(index!=-1) {
            this.lastInvalidInputs.splice(index, 1);
            // console.log('deleted From invalid list');
            return true;
        }
        return false;
    }

    /**
     * Set current ErrorOutput proprieties to those parameters if they are prioritized and out put the error message in the HTMLElement.
     * !!This method is not appropriate if many validators are using the same output.
     * !!DO NOT CALL THIS DIRECTLY. Call the signalMethod instead.
     * @param {Element} errOrigin 
     * @param {number} errCode 
     * @param {number} priority 
     */
    setCurrentErrorTo(errOrigin, errCode, priority=0) {
        if(this.curErrorPriority<=priority || errCode==0) {
            this.curErrorCode = errCode;
            this.curErrorPriority = priority;
            this.curErrorOrigin = errOrigin;
            this.htmlElement.innerHTML = InputErrors.getErrorMsg(errCode);
        }
    }

    
}