const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function ShowError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
// Show Success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}
// check for required field
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      ShowError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
// Check email is valid
function checkEmail(input) {
  //regex
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    ShowError(input, 'Email is not valid');
  }
}
//check input length (play with params !)
function checkLength(input, min, max) {
  if (input.value.length < min) {
    ShowError(
      input,
      `${getFieldName(input)} must contain at least ${min} characters`
    );
  } else if (input.value.length > max) {
    ShowError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
// Check passwords match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    ShowError(input2, "password don't match");
  }
}
//getField Name: a simple function that captilaze the first letter
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
form.addEventListener('submit', e => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 17);
  checkLength(password, 8, 16);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
