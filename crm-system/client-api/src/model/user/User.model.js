import UserModel from "./User.schema.js";

const insertUser = (user) => {
  return new Promise((resolve, reject) => {
    UserModel(user)
      .save()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

const getUserByEmail = async (email) => {
  if (!email) return false;
  try {
    const data = await UserModel.findOne({ email }).exec();
    return data;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (_id) => {
  if (!_id) return false;
  try {
    const data = await UserModel.findOne({ _id }).exec();
    return data;
  } catch (error) {
    throw error;
  }
};

const storeUserRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      UserModel.findOneAndUpdate(
        { _id },
        {
          $set: {
            "refreshJWT.token": token,
            "refreshJWT.addedAt": Date.now(),
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((err) => {
          console.log("Error from storeUserRefreshJWT", err);
          reject(err);
        });
    } catch (error) {
      console.log("Error from storeUserRefreshJWT", error);
      reject(error);
    }
  });
};

const updatePassword = (email, hashedPass) => {
  return new Promise((resolve, reject) => {
    try {
      UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            password: hashedPass,
          },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

export {
  insertUser,
  getUserByEmail,
  getUserById,
  storeUserRefreshJWT,
  updatePassword,
};
