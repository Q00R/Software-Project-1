import TicketCardClient from "../components/TicketCardClient";
import { useState, useEffect } from "react";
import axios from "axios";
// import { set } from "mongoose";
const ClientTickets = () => {
  const clientURL = "http://localhost:3000/client";

  const [ticketCards, setTicketCards] = useState([]); //just give type of object
  const [statusChosen, setStatusChosen] = useState("All");

  const handleStatusOpen = async () => {
    setStatusChosen("Opened");
    await axios
      .get(`${clientURL}/tickets/filter/:${"Opened"}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTicketCards(response.data);
      })
      .catch((error) => console.error("Could not fetch data", error));
  };

  const handleStatusClosed = async () => {
    setStatusChosen("Closed");
    await axios
      .get(`${clientURL}/tickets/filter/${"Closed"}`, { withCredentials: true })
      .then((response) => {
        setTicketCards(response.data);
      })
      .catch((error) => console.error("Could not fetch data", error));
  };

  const handleStatusInProgress = async () => {
    setStatusChosen("In Progress");
    await axios
      .get(`${clientURL}/tickets/filter/${"In Progress"}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTicketCards(response.data);
      })
      .catch((error) => console.error("Could not fetch data", error));
  };
  const handleStatusAll = async () => {
    setStatusChosen("All");
    await axios
      .get(`${clientURL}/tickets`, { withCredentials: true })
      .then((response) => {
        setTicketCards(response.data);
      })
      .catch((error) => console.error("Could not fetch data", error));
    setStatusAll(true);
  };

  useEffect(() => {
    if (statusChosen === "All") {
      axios
        .get(`${clientURL}/tickets`, { withCredentials: true })
        .then((response) => {
          setTicketCards(response.data);
        })
        .catch((error) => console.error("Could not fetch data", error));
    }
  }, []);

  return (
    <section>
      <div className="flex justify-center items-center m-2">
        <button
          id="Opened"
          className="btn btn-primary mx-2"
          onClick={handleStatusOpen}
        >
          Opened
        </button>
        <button
          id="In Progress"
          className="btn btn-primary mx-2"
          onClick={handleStatusInProgress}
        >
          In Progress
        </button>
        <button
          id="Closed"
          className="btn btn-primary mx-2"
          onClick={handleStatusClosed}
        >
          Closed
        </button>
        <button
          id="All"
          className="btn btn-primary mx-2"
          onClick={handleStatusAll}
        >
          All
        </button>
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {ticketCards.length > 0 ? (
          ticketCards.map((element) => (
            console.log(element),

            <TicketCardClient
              key={element._id}
              {...element}
            />
          ))
        ) : (
          <div className="text-2xl font-montserrat">
            Looks like you haven't opened any tickets yet!
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientTickets;
