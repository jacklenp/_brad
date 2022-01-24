console.log('brad');

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
 


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerHTML = message;
}

function showSuccess(input) {
    console.log(input.value);
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if(re.test(input.value.trim())) {
        return showSuccess(input);
    } else {
        return showError(input, `${getFieldName(input)}  is not valid`)
    }
}

function checkPasswordMatch(passord, passord2) {
    if (passord.value !== passord2.value ) {
        showError(passord2, `${getFieldName(passord2)}  is not match`)
    }
}

// Check require fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        // console.log(input.placeholder);
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} field is required`)
        } else {
            showSuccess(input);
        }
    });
}

// Check length of inputs
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} charecters`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less then ${min} charecters`)
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(username.value);

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkLength(password2, 6, 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);
}) 


// function showError(input, message) {
//     const formControl = input.parentElement;
//     formControl.className = 'form-control error';
//     const small = formControl.querySelector('small')
//     small.innerHTML = message;
// }

// function showSuccess(input) {
//     console.log(input.value);
//     const formControl = input.parentElement;
//     formControl.className = 'form-control success';
// }

// // Check email is valid
// function isValidEmail(email) {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// //Event listener
// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     console.log(username.value);

//     if (username.value === '') {
//         showError(username, 'USername field is required')
//     } else {
//         showSuccess(username);
//     }
//     if (email.value === '') {
//         showError(email, 'E-mail field is required')
//     } else if (!isValidEmail(email.value)) {
//         showError(email, 'E-mail field is not valid')

//     } else {
//         showSuccess(email);
//     }
//     if (password.value === '') {
//         showError(password, 'Password field is required')
//     } else {
//         showSuccess(password);
//     }
//     if (password2.value === '') {
//         showError(password2, 'Password-2 field is required')
//     } else {
//         showSuccess(password2);
//     }
// }) 
