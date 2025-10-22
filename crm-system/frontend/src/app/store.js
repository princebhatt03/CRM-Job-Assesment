import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "../features/ticket/ticketsSlice";
import loginReducer from "../features/login/loginSlice";

export const store = configureStore(
  {
    reducer: {
      tickets: ticketsReducer,
      login: loginReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
