import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isLoading: false,
  error: "",
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    fetchTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload;
      state.error = "";
    },
    fetchTicketFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.tickets = [];
    },
  },
});

const { reducer, actions } = ticketListSlice;

export const { fetchTicketLoading, fetchTicketSuccess, fetchTicketFailure } =
  actions;
export default reducer;
