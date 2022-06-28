const { body } = require('express-validator');

const registerValidation = [
    // Name should not be empty
    body('username').custom((value, { req }) => {
        console.log(value);
        if (value.length < 1) {
            throw new Error("Username cannot be empty.");
        }
        return true;
    }),


    // Password needs to be min 6 chars

    body('password').custom((value, { req }) => {
        console.log(value);
        if (value.length < 6) {
            throw new Error("Password must be 6 characters long.");
        }
        return true;
    }),
    // Confirm Password needs to be min 6 chars AND must match the req.body.password field
    body('confirmPass').custom((value, { req }) => {

        console.log(value);
        if (value !== req.body.password) {
            throw new Error("Passwords must match.");
        }
        return true;
    })
];

const loginValidation = [
    // Name should not be empty
    body('username').custom((value, { req }) => {
        console.log(value);
        if (value.length < 1) {
            throw new Error("Username cannot be empty.");
        }
        return true;
    }),


    // Password needs to be min 6 chars

    body('password').custom((value, { req }) => {
        console.log(value);
        if (value.length < 1) {
            throw new Error("Password cannot be empty");
        }
        return true;
    })
];
module.exports = { registerValidation, loginValidation };