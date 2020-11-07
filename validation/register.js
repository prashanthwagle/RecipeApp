const Validator = require("validator");
const isEmpty = require("is-empty");


//Function for User Credential Validation
const validateRegisterInput = (data)=>{

    //Instantiate Errors Object meant to send errors to the client
    let errors = {};

    //Convert Empty Fields into Empty String
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Name Checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    //Email Checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Password Checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    //Confirm-Password Checks
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    //Match the passwords
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }

}

module.exports = validateRegisterInput;


