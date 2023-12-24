import ViewTicketForm from "./ViewTicketForm";
import { useState, useEffect } from "react";
import axios from "axios";

const TicketCardClient = ({
  cardKey,
  title,
  mainIssue,
  subIssue,
  status,
  priority,
}) => {
  const clientURL = "http://localhost:3000/client";

  const [ticket, setTicket] = useState({});

  const [fetchData, setfetchData] = useState(false);

  const [showModel, setShowModel] = useState(false);

  const ticketId = cardKey;

  const handleViewTicket = async () => {
    // setfetchData(true);
    // console.log("ticket id: ", cardKey);
    document.getElementById("my_modal_3").showModal();
  };

  // useEffect(() => {
  //   if (fetchData) {
  //     axios
  //       .get(`${clientURL}/tickets/${ticketId}`, {
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         setTicket(response.data);
  //         setShowModel(true);
  //         //console.log(ticket);
  //         //console.log(showModel);
  //       });
  //   }
  // }, [ticket]);

  // useEffect(() => {
  //   console.log("Show Model: ", showModel);
  //   if (showModel) {
  //     document.getElementById("my_modal_3").showModal();
  //   }
  // }, [showModel]);

  const inputDateCreation = new Date(ticket.creationDate);
  const inputDateResolution = new Date(ticket.resolutionDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDateCreation = inputDateCreation.toLocaleString(
    "en-US",
    options
  );
  const formattedDateResolution = inputDateResolution.toLocaleString(
    "en-US",
    options
  );

  return (
    <div className="card bg-base-100 shadow-xl m-1">
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div>
            <div className="badge badge-secondary bg-secondary border-none">
              {priority}
            </div>
            <div className="badge badge-secondary bg-primary border-none">
              {status}
            </div>
          </div>
        </h2>
        <div>
          <p>
            {mainIssue} : {subIssue}
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleViewTicket}>
          View Ticket
        </button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <ViewTicketForm
              title={title}
              description={ticket.description}
              status={status}
              priority={priority}
              mainIssue={mainIssue}
              subIssue={subIssue}
              rating={ticket.rating}
              response={ticket.response}
              creationDate={formattedDateCreation}
              resolutionDate={formattedDateResolution}
            />
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TicketCardClient;
