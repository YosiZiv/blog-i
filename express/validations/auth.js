const Validator = require('validator');

exports.validateLoginInput = data => {
  const errors = {};

  const { email = '', password = '' } = data;
  //  Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'email require';
  }
  if (!Validator.isEmail(email)) {
    errors.email = 'email incorrect';
  }
  //  password validation
  if (Validator.isEmpty(password)) {
    errors.password = 'password require';
  }
  return {
    errors
  };
};

exports.validateRegisterInput = data => {
  const errors = {};
  console.log(data);
  const { firstName = '', lastName = '', email = '', password = '' } = data;

  //  first name validations
  if (!Validator.isLength(firstName, { min: 2, max: 30 })) {
    errors.firstName = 'First Name is too shot or too long';
  }
  if (Validator.isEmpty(firstName)) {
    errors.firstName = 'First name is required';
  }
  //  last_name validation
  if (!Validator.isLength(lastName, { min: 2, max: 30 })) {
    errors.lastName = 'Last Name is too shot or too long';
  }
  if (Validator.isEmpty(lastName)) {
    errors.lastName = 'Last name is required'
  }

  //  Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'Email address is required';
  }
  if (!Validator.isEmail(email)) {
    errors.email = 'Emial address is not valid ';
  }
  //  password validation
  if (Validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password should be minimum of 6 characters and max of 30 characters';
  }
  console.log(errors);

  //  company name validation
  return {
    errors
  };
};
