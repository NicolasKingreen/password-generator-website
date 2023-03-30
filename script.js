// inputs
const passwordLengthInput = document.getElementById("password-length-input");
const passwordsAmountInput = document.getElementById("passwords-amount-input");

// checkboxes
const withSymbolsCheckbox = document.getElementById("symbols-checkbox");
const withNumbersCheckbox = document.getElementById("numbers-checkbox");
const noConfusionCheckbox = document.getElementById("no-confusion-checkbox");

// buttons
const generateButton = document.getElementById("generate-button");

// output
const generatedPasswordsArea = document.getElementById("generated-passwords-area");



// const generatedPasswordInput = document.getElementById("generated-password-input");

//const copyButton = document.getElementById("copy-button");


function generatePassword(length, withSymbols, withNumbers, noConfusion) {
    var lowercaseLetters = "abcdefghijkmnopqrstuvwxyz";
    if (noConfusion)
        lowercaseLetters.replace('l', '');

    var uppercaseLetters = lowercaseLetters.toUpperCase();
    if (noConfusion) {
        uppercaseLetters.replace('I', '');
        uppercaseLetters.replace('O', '');
        uppercaseLetters.replace('Q', '');
    }

    var symbols = "!#%+:=?@";
    if (!noConfusion)
        symbols += "\"$&'()*,-./;<>[]^_{|}~";

    var numbers = "1234567890";
    if (noConfusion) {
        numbers.replace('1', '');
        numbers.replace('0', '');
    }

    var charset = lowercaseLetters + uppercaseLetters;
    if (withSymbols)
        charset += symbols;
    if (withNumbers)
        charset += numbers;
    charsetLength = charset.length;

    password = "";
    for (var i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charsetLength));
    }

    return password;
}

function showSnackBar() {
    var sb = document.getElementById("snackbar");
    sb.className = "show";
    setTimeout(() => {
        sb.className = sb.className.replace("show", "");
    }, 2900);
}

function onGenerate() {
    var passwordLength = passwordLengthInput.value;
    var withSymbols = withSymbolsCheckbox.checked;
    var withNumbers = withNumbersCheckbox.checked;
    var noConfusion = noConfusionCheckbox.checked;
    var passwordsAmount = passwordsAmountInput.value;

    if (passwordLength > 50 || passwordLength < 8)
        return;

    if (passwordsAmount > 10 || passwordsAmount < 1)
        return;

    var passwords = [];
    for (let i = 0; i < passwordsAmount; i++) 
    {
        var new_password = generatePassword(passwordLength, withSymbols, withNumbers, noConfusion);
        passwords.push(new_password);
    }

    generatedPasswordsArea.rows = passwordsAmount;
    generatedPasswordsArea.value = passwords.join("\n");
}

// function onCopy() {
//     text = generatedPasswordInput.value;
//     if (text == "")
//         return;
//     navigator.clipboard.writeText(text);
//     // document.getElementById("copy-done").name = "checkmark-outline";
//     copyButton.children[1].children[0].name = "checkmark-outline";
//     showSnackBar();
//     setTimeout(() => {
//         copyButton.children[1].children[0].name = "copy-outline";
//     }, 3000);
// }

generateButton.addEventListener('click', ()=> {
    onGenerate();
});

// copyButton.addEventListener('click', ()=> {
//     onCopy();
// });
