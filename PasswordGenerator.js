const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type = checkbox]");//all check box will come 
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const symbols = '`~`!@#$%&*_]{-}:;"<,>/.';
// copyButton() function for copy button
// handelSlider ()  for slider 
// generatePassword() for generating
// setIndicator () for changing color of circle

// ******(these all for generating random password according to words)
// getRandomInteger (min,max)  for generating random password
// getRandomUppercase ()
// getRandomLowercase ()  
// getRandomNumber ()
// getRandomSymbols ()
// *******(these all for generating random password according to words)

// ********* flow of code will be like this
// 1) first we will decide how many words we need in password by help of slider
// 2) then we will go to checkbox option to choose what things we need in password
// 3) then we will click on generate button to generate pasword
// 4) then password will be generated in text area
// 5) then according to strength of password the indicator color will gets changed
// 6) then we will copy password with copy button
// ********** flow of code will be like this




let password = "";
let passwordLength = 10;
let checkCount = 0 ;  //default 0 option will be checked and if even single checkbox is not checked then password will not be generaated that's why checkCount = 1; 

handleSlider();   // called below build function here
setIndicator("#ccc");

// set passwordLength

function handleSlider() {

    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"

}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length); 
    return symbols.charAt(randNum);

}

function calcStrength() {
    let hasUpper = false;  // false means option is not checked 
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;  //checked means option is selected in checbox
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true; //checked means option is selected in checbox

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) && passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }

}

async function copyContent() {  // here we will use promices to cpy text sp promicw takes two paramater one is when promice gets succesfully complete show this message if faiiled show this  
    //async is writen there because await will only work if will use async before function
    try {
        //await is used because by this task will run contioousy and tell error or success

        await navigator.clipboard.writeText(passwordDisplay.value) // this function will copy value from passwordDisplay
        copyMsg.innerText = "copied !";

    } 
    catch (e) {
        copyMsg.innerText = "error while copying";
    }
    // to make copy wala span visible means copied message visible
    copyBtn.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active")
    }, 3000);  // this will remve copied message after 3 sec 

}

function sufflePassword(array){
    //there is one method to suffle passwords are Fisher Yates Method
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el)=> (str += el));
    return str;
    
    }

    function handleCheckBoxChange() {  //handleCheckBoxChange function is declared below first 
        checkCount = 0;
        allCheckBox.forEach( (checkbox) => {
            if (checkbox.checked) {
                checkCount++;
            }
        });
    
        // special case optional to add  (for example if all 4 checkBox are checked and but we give slider password value = 1 or less then checked item so it should automatically change slider value = checked value  )
        if (passwordLength < checkCount) {
            passwordLength = checkCount;
            handleSlider(); // handelSlider function is called because this fuction will show changes in UI
        }
    
    }
    allCheckBox.forEach( (checkbox) => {
        checkbox.addEventListener('change', handleCheckBoxChange)

    })



//now appling eventlistneron buttons where where is required


//whenever value/input of slider is changing by sliding slider left and right.
//e.target means slider it is pointing slider
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider(); //handel slider function is called here because above we write handel slider function which change valuse of slider (10) passwordlength contains value 
}) 

copyBtn.addEventListener('click', () => { //copy is only possible if input area contains password so we had to write if statement for that
    if (passwordDisplay.value) 
        copyContent();  //if passwordDAisply contsins value then call copyContent function which is declared above 
    // else if(passwordDisplay.length > 0){
    // }  
})




//for each is optional because allcheckbox have all checkboxes



generateBtn.addEventListener('click', () => {
//no checkbox are selected 
if(checkCount == 0)
     return;

if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSlider();
}

//remove old password
password = "";

//lets put the values mentioned in checkboxes
// if(uppercaseCheck.checked){
// password += generateUpperCase();
// }
// if(lowercaseCheck.checked){
//     password += generateLowerCase();
// }
// if(numbersCheck.checked){
//     password += generateRandomNumber();
//     }
//     if(symbolsCheck.checked){
//         password += generateSymbol();
//     }
    
let funcArr = [];

if(uppercaseCheck.checked)
funcArr.push(generateUpperCase);

if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase);

if(numbersCheck.checked)
   funcArr.push(generateRandomNumber);
    
    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);
    
    

//compulory addition  means those option are checked that are compulusry to add ..
for( let i=0; i<funcArr.length; i++){

    password += funcArr[i]();
}


//remaining addition
for(let i = 0 ; i<passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0 , funcArr.length);
    password += funcArr[randIndex]();
}
// now we need to suffle password otherwise it will come in line like 1st upper case then lower then etc so we need to suffle
password = sufflePassword(Array.from(password));


//showng password in input field
passwordDisplay.value = password;
//now showing strength by calling strength function ;
calcStrength(); 




});