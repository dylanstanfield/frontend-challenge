// Credit https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Credit https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const isValidName = (val) => typeof val === 'string' && val.length < 100;

export const isValidEmail = (val) => typeof val === 'string' && !!val.toLowerCase().match(emailRegex);

export const isValidPassword = (val) => typeof val === 'string' && !!val.match(passwordRegex);