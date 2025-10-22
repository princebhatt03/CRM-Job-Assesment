import axios from "axios";

const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:5000/v1/ticket", {
        headers: {
          authorization: sessionStorage.getItem("accessToken"),
        },
      });
      if (result) resolve(result);
      else reject(new Error("Server error"));
    } catch (error) {
      if (error.response) reject(error.response.data);
      else reject(error);
    }
  });
};

const createTicket = (ticketData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/v1/ticket",
        ticketData,
        {
          headers: {
            authorization: sessionStorage.getItem("accessToken"),
          },
        }
      );
      if (result) resolve(result);
      else reject(new Error("Unable to create ticket"));
    } catch (error) {
      if (error.response) reject(error.response.data);
      else reject(error);
    }
  });
};

export { getAllTickets, createTicket };
