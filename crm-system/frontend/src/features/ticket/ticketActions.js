import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFailure,
} from "./ticketsSlice.js";
import { getAllTickets } from "../../api/ticketApi.js";

const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());
  try {
    const result = await getAllTickets();
    const tickets = await result.data.tickets;
    return dispatch(fetchTicketSuccess(tickets));
  } catch (error) {
    return dispatch(fetchTicketFailure(error.message));
  }
};

export { fetchAllTickets };
