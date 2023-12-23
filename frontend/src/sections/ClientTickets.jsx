import TicketCardClient from "../components/TicketCardClient";
import {useState, useEffect} from 'react';
const ClientTickets = () => {

  const clientURL = 'http://localhost:3000/client';

  const [ticketCards, setTicketCards] = useState([]) //just give type of object

  const fetchTickets = async () => {
    const {tickets} = (await axios.get(`${clientURL}/tickets`, { withCredentials: true })).data;
    setTicketCards(tickets);
  }

  useEffect(() => { //DONIA
    fetchTickets;
  }, []);

  return (
    <section className="flex flex-wrap">
      {
        ticketCards.map((ticket) => 
        {
          <TicketCardClient 
          title = {ticket.title}
          mainIssue={ticket.mainIssue}
          subIssue={ticket.subIssue}
          priority={ticket.priority}
          status={ticket.status}
          />

        })
      }
    </section>
  );
};

export default ClientTickets;
