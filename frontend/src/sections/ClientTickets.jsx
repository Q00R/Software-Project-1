import TicketCardClient from "../components/TicketCardClient";
import { useState, useEffect } from "react";
import axios from "axios";
// import { set } from "mongoose";
const ClientTickets = () => {
  const clientURL = "http://localhost:3000/client";

  const [openedTickets, setOpenedTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [inProgressTickets, setInProgressTickets] = useState([]);
  const [mainIssue, setmainIssue] = useState("All");

  const handleIssueSoftware = async () => {
    setmainIssue("Software");
  };

  const handleIssueNetwork = async () => {
    setmainIssue("Network");
  };

  const handleIssueHardware = async () => {
    setmainIssue("Hardware");
  };
  const handleStatusAll = async () => {
    setmainIssue("All");
  };

  useEffect(() => {
    if (mainIssue === "All") {
      axios
        .get(`${clientURL}/tickets`, { withCredentials: true })
        .then((response) => {
          setOpenedTickets(response.data.opened);
          setClosedTickets(response.data.closed);
          setInProgressTickets(response.data.inProgress);
        })
        .catch((error) => console.error("Could not fetch data", error));
    } else {
      axios
        .get(`${clientURL}/tickets/filter/${mainIssue}`, {
          withCredentials: true,
        })
        .then((response) => {
          setOpenedTickets(response.data.opened);
          setClosedTickets(response.data.closed);
          setInProgressTickets(response.data.inProgress);
        })
        .catch((error) => console.error("Could not fetch data", error));
    }
  }, [mainIssue]);

  return (
    <section>
      <div className="flex justify-center items-center m-2">
        <button
          id="Software"
          className="btn btn-primary mx-2 w-[100px]"
          onClick={handleIssueSoftware}
        >
          Software
        </button>
        <button
          id="Hardware"
          className="btn btn-primary mx-2 w-[100px]"
          onClick={handleIssueHardware}
        >
          Hardware
        </button>
        <button
          id="Network"
          className="btn btn-primary mx-2 w-[100px]"
          onClick={handleIssueNetwork}
        >
          Network
        </button>
        <button
          id="All"
          className="btn btn-primary mx-2 w-[100px]"
          onClick={handleStatusAll}
        >
          All
        </button>
      </div>

      <div className="my-3">
        <div className="text-2xl font-montserrat font-semibold">
          Opened Tickets
        </div>
        <div className="flex flex-row overflow-x-auto scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md">
          {openedTickets.length > 0 ? (
            openedTickets.map(
              (element) => (
                console.log(element),
                (<TicketCardClient key={element._id} {...element} />)
              )
            )
          ) : (
            <div className="text-xl font-montserrat">No Tickets Here!</div>
          )}
        </div>
      </div>
      <div>
        <div className="text-2xl font-montserrat font-semibold">
          In Progress Tickets
        </div>
        <div className="flex flex-row overflow-auto scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md">
          {inProgressTickets.length > 0 ? (
            inProgressTickets.map(
              (element) => (
                console.log(element),
                (<TicketCardClient key={element._id} {...element} />)
              )
            )
          ) : (
            <div className="text-xl font-montserrat">No Tickets Here!</div>
          )}
        </div>
      </div>
      <div>
        <div className="text-2xl font-montserrat font-semibold">
          Closed Tickets
        </div>
        <div className="flex flex-row overflow-x-auto scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md">
          {closedTickets.length > 0 ? (
            closedTickets.map(
              (element) => (
                console.log(element),
                (<TicketCardClient key={element._id} ticketId={element._id} {...element} />)
              )
            )
          ) : (
            <div className="text-xl font-montserrat">No Tickets Here!</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientTickets;
