import TicketCardClient from "../components/TicketCardClient";
import { useState, useEffect } from "react";
import axios from "axios";
const ClientTickets = () => {
  const clientURL = "http://localhost:3000/client";

  const [ticketCards, setTicketCards] = useState([]); //just give type of object

  useEffect(() => {
    axios
      .get(`${clientURL}/tickets`, { withCredentials: true })
      .then((response) => {
        setTicketCards(response.data);
      })
      .catch((error) => console.error("Could not fetch data", error));
    console.log(ticketCards[0]);
  }, []);

  return (
    <section className="flex flex-wrap">
      {ticketCards.length > 0 ? (
        ticketCards.map((element, index) => (
          <TicketCardClient
            key={index} // Add a unique key for each mapped element
            title={element.title}
            mainIssue={element.mainIssue}
            subIssue={element.subIssue}
            priority={element.priority}
            status={element.ticketStatus}
          />
        ))
      ) : (
        <div className="text-2xl font-montserrat">
          Looks like you haven't opened any tickets yet!
        </div>
      )}
    </section>
  );
};

export default ClientTickets;
