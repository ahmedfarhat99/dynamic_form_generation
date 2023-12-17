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
});

exports.validateParticipant = validators(participantSchema);
