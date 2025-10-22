import { loginPending, loginSuccess, loginFailure } from "./loginSlice.js";
import { loginApi } from "../../api/userApi.js";

const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(loginPending());
    try {
      const response = await loginApi({ email, password });
      return dispatch(loginSuccess());
    } catch (error) {
      return dispatch(loginFailure(error.message));
    }
  };

export { login };
