const Joi = require("joi");

const signupvalidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(/[A-Z]/) 
      .pattern(/[0-9]/) 
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one uppercase letter and one number",
      }),
    age: Joi.number().optional(),
    role: Joi.string().valid("Admin", "Candidate"),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: true,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  req.body = value;
  next();
};

const loginvalidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: true,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  req.body = value;
  next();
};

// Job validation
const createJobValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    skills: Joi.array().items(Joi.string()).min(1).required(),
    location: Joi.string().required(),
    salary: Joi.string().required(),
    jobType: Joi.string()
      .valid("fulltime", "parttime", "internship", "remote")
      .required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

const updateJobValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().min(10),
    skills: Joi.array().items(Joi.string()),
    location: Joi.string(),
    salary: Joi.string(),
    jobType: Joi.string().valid("fulltime", "parttime", "internship", "remote"),
    isActive: Joi.boolean(),
  });

  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

// Application validation
const applyJobValidation = (req, res, next) => {
  const schema = Joi.object({
    jobId: Joi.string().required(),
    resumeUrl: Joi.string().required(),
    coverLetter: Joi.string().allow("").optional(),
  });

  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

// Profile update validation
const updateProfileValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).optional(),
    phone: Joi.string().allow("").optional(),
    address: Joi.string().allow("").optional(),
    experience: Joi.string().allow("").optional(),
    bio: Joi.string().allow("").optional(),
    skills: Joi.array().items(Joi.string()).optional(),
    companyName: Joi.string().allow("").optional(),
    companyWebsite: Joi.string().allow("").optional(),
    companySize: Joi.string().allow("").optional(),
    jobRole: Joi.string().allow("").optional(),
    resumeUrl: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = {
  signupvalidation,
  loginvalidation,
  createJobValidation,
  updateJobValidation,
  applyJobValidation,
  updateProfileValidation,
};
