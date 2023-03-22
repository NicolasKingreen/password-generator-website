// inputs
var passwordLengthInput = document.getElementById("password-length-input");

var withSymbolsCheckbox = document.getElementById("symbols-checkbox");
var withNumbersCheckbox = document.getElementById("numbers-checkbox");

const generatedPasswordInput = document.getElementById("generated-password-input");

// buttons
const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");


function generatePassword(length, withSymbols, withNumbers) {
    var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    var uppercaseLetters = lowercaseLetters.toUpperCase();
    var symbols = "!@#$%^&*()"
    var numbers = "1234567890";

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

    if (passwordLength < 8)
        return;

    var password = generatePassword(passwordLength, withSymbols, withNumbers);
    generatedPasswordInput.value = password;
    copyButton.children[1].children[0].name = "copy-outline";
}

function onCopy() {
    text = generatedPasswordInput.value;
    if (text == "")
        return;
    navigator.clipboard.writeText(text);
    // document.getElementById("copy-done").name = "checkmark-outline";
    copyButton.children[1].children[0].name = "checkmark-outline";
    showSnackBar();
    setTimeout(() => {
        copyButton.children[1].children[0].name = "copy-outline";
    }, 3000);
}

generateButton.addEventListener('click', ()=> {
    onGenerate();
});

copyButton.addEventListener('click', ()=> {
    onCopy();
});
