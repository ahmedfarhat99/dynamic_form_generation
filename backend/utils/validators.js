const Joi = require("joi");

const validators = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: true });

const participantSchema = Joi.object({
  firstName: Joi.string().required().min(3).max(30).messages({
    "string.empty": "First name required!",
    "string.min": "First name must contain at least 3 characters!",
    "string.max": "First name must contain at most 30 characters!",
  }),
  lastName: Joi.string().required().min(3).max(30).messages({
    "string.empty": "Last name required!",
    "string.min": "Last name must contain at least 3 characters!",
    "string.max": "Last name must contain at most 30 characters!",
  }),
  email: Joi.string()
    .required()
    .email()
    .lowercase()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
    .messages({
      "string.empty": "Email required!",
      "string.email": "Invalid email!",
      "string.pattern.base": "Invalid email!",
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{8}$/) // Ensure exactly 8 digits
    .messages({
      "string.pattern.base": "Invalid phone number format!",
    }),
  resume: Joi.string()
    .uri()
    .custom((value, helpers) => {
      // Check if the URL ends with a valid PDF extension
      if (!value.toLowerCase().endsWith(".pdf")) {
        return helpers.message(
          "Invalid file type for resume, it should be a PDF!"
        );
      }
      return value;
    })
    .messages({
      "string.uri": "Invalid URL format for resume!",
    }),
  linkedin: Joi.string().uri().messages({
    "string.uri": "Invalid LinkedIn profile URL!",
  }),
  github: Joi.string().uri().messages({
    "string.uri": "Invalid GitHub profile URL!",
  }),
  portfolio: Joi.string().uri().messages({
    "string.uri": "Invalid Portfolio profile URL!",
  }),
  coverLetter: Joi.string(),
  photo: Joi.string().uri().messages({
    "string.uri": "Invalid URL format for photo!",
  }),
  birthDate: Joi.date().iso().messages({
    "date.base": "Invalid date format for birth date!",
    "date.iso":
      "Invalid date format for birth date, it should be in ISO 8601 format!",
  }),
  postalCode: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
  degree: Joi.string().valid("Bachelor", "Master").messages({
    "any.only": "Invalid degree value, it should be 'Bachelor' or 'Master'!",
  }),
  fieldOfStudy: Joi.string(),
  university: Joi.string(),
  possibleStartDate: Joi.date().iso().messages({
    "date.base": "Invalid date format for possible start date!",
    "date.iso":
      "Invalid date format for possible start date, it should be in ISO 8601 format!",
  }),
});

exports.validateParticipant = validators(participantSchema);
