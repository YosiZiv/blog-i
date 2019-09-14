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
    errors.firstName = 'שם פרטי חייב להכיל לפחות 2 תווים ועד 30 תווים';
  }
  if (Validator.isEmpty(firstName)) {
    errors.firstName = 'שם פרטי זה שדה חובה';
  }
  //  last_name validation
  if (!Validator.isLength(lastName, { min: 2, max: 30 })) {
    errors.lastName = 'שם משפחה חייב להכיל לפחות 2 תווים ועד 30 תווים';
  }
  if (Validator.isEmpty(lastName)) {
    errors.lastName = 'שם משפחה שדה חובה';
  }

  //  Email validation
  if (Validator.isEmpty(email)) {
    errors.email = 'איימיל שדה חובה';
  }
  if (!Validator.isEmail(email)) {
    errors.email = 'איימיל לא תקין';
  }
  //  password validation
  if (Validator.isEmpty(password)) {
    errors.password = 'סיסמא שדה חובה';
  }
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'סיסמא חייב להכיל לפחות 6 תווים ועד 30 תווים בלבד';
  }
  console.log(errors);

  //  company name validation
  return {
    errors
  };
};
