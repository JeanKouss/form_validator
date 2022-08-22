/**
 * Class which define the list of errors message.
 * 
 * Every error have its code, and an user comprehensive message,
 * translated in supported languages.
 * This message must help user(website visitor) undestand the error of his input.
 */
class InputError {
    /**
     * 
     * @param {InputValidator} origin 
     * @param {int} code 
     * @param {int} priority 
     */
    constructor(origin, code=0, priority=0) {
        this.origin = origin;
        this.code = code;
        this.priority = priority;
    }

    static suportedLang = ['en', 'fr'];
    static lang = 'en';
    /**
     * Sets the language into which the error is been displaying,
     * to an another supported one.
     * @param {string} lang 
     */
    static setLang(lang) {
        if(lang in this.suportedLang)
        {
            this.lang = lang;
        } else {
            console.error("This language is not supported het");
        }
    }

    /**
     * Entire error getter
     * @param {int} code 
     * @returns {object}
     */
    static getError(code) {
        return this.error[code];
    }

    /**
     * Get only the message associated to the error code, in the setted language.
     * @param {int} code 
     * @returns {string}
     */
    static getErrorMsg(code) {
        return this.error[code][this.lang];
    }

    /* 
    Errors object
    Every error has a code and a user(website visitor) comprehensive traduction in all supported language.

    !! Notes for editing
    -The error code must be the same as its index/key in the object.
    -The error messages are not for the programmer but the website visitor 
        : make it as clear as possible for non developpers.
    */
    static error = {
        0 : { // No error (user input correct)
            'code' : 0,
            'fr' : '',
            'en' : ''
        },
        1 : { // Default error : must not be used cause it is not clear.
            'code' : 1,
            'fr' : 'Entrée erronée',
            'en' : 'Input error'
        },
        2 : { // Input lenght error
            'code' : 2,
            'fr' : 'Valeur d\'entrée ne respecte pas la longeur voulue',
            'en' : 'Incorrect input lenght'
        },
        3 : { // Password too short 
            'code' : 3,
            'fr' : 'Mot de passe trop court',
            'en' : 'Password too short'
        }
    };

}