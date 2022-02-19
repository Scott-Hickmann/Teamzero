import passwordValidator from 'password-validator';

// Create a schema
const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(50) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces();

export function validateName(name: string) {
  return name.length >= 3;
}

export function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function validatePassword(password: string) {
  return passwordSchema.validate(password);
}
