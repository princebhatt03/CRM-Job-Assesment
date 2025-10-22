import resetPinModel from "./resetPin.schema.js";

const setPasswordResetPin = (email) => {
  const randPin = Math.floor(100000 + Math.random() * 900000);

  const resetObj = {
    email,
    pin: randPin.toString(),
  };

  return new Promise((resolve, reject) => {
    try {
      resetPinModel(resetObj)
        .save()
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const deletePasswordResetPin = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      resetPinModel
        .findOneAndDelete({ email })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

const getPinByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    try {
      resetPinModel
        .findOne({ email })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

export { setPasswordResetPin, deletePasswordResetPin, getPinByEmail };
