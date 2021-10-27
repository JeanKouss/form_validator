let input1 = document.querySelector('.first');
let input2 = document.querySelector('.second');
let input3 = document.querySelector('.third');
let outputElem = document.querySelector('.outputEl');
let output = new ErrorOutput(outputElem);

let validator1 = new TextInputValidator(input1, output, 4);
validator1.validateOnInput();
let validator2 = new TextInputValidator(input2, output, 4, 10);
validator2.validateOnInput();
let validator3 = new PasswordInputValidator(input3, output, 5);
validator3.validateOnInput();
