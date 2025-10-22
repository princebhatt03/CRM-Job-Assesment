import joi from "joi";

const validator = (schema) => (params) =>
  schema.validate(params, { abortEarly: false });

const email = joi.string().email().required();
const password = joi.string().min(8).required();
const pin = joi.string().min(6).max(6).required();

const subject = joi.string().min(5).max(100).required();
const sender = joi.string().min(5).max(50).required();
const message = joi.string().min(5).max(1000).required();

const loginValidation = (req, res, next) => {
  req.body.email = req.body.email?.trim();
  req.body.password = req.body.password?.trim();

  const schema = joi.object({
    email,
    password,
  });
  const { error } = validator(schema)(req.body);
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return res.status(400).json({ message });
  }
  next();
};

const resetPassReqValidation = (req, res, next) => {
  req.body.email = req.body.email?.trim();
  const schema = joi.object({ email });
  const { error } = validator(schema)(req.body);
  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return res.status(400).json({ message });
  }
  next();
};

const resetPassValidation = (req, res, next) => {
  const schema = joi.object({
    email,
    pin,
    newPassword: password,
  });
  const { error } = validator(schema)(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const ticketCreationValidation = (req, res, next) => {
  const schema = joi.object({
    subject,
    sender,
    message,
  });
  const { error } = validator(schema)(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const ticketUpdateValidation = (req, res, next) => {
  const schema = joi.object({
    sender,
    message,
  });
  const { error } = validator(schema)(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

export {
  loginValidation,
  resetPassReqValidation,
  resetPassValidation,
  ticketCreationValidation,
  ticketUpdateValidation,
};
