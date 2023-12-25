import ViewTicketForm from "./ViewTicketForm";
import { useState, useEffect } from "react";
import axios from "axios";

const TicketCardClient = ({
  title,
  description,
  status,
  priority,
  mainIssue,
  subIssue,
  rating,
  response,
  creationDate,
  resolutionDate,
}) => {
  const clientURL = "http://localhost:3000/client";

  const [ticket, setTicket] = useState({});

  const [fetchData, setfetchData] = useState(false);

  const [showModel, setShowModel] = useState(false);

  //const ticketId = cardKey;

  const handleViewTicket = () => {
    console.log(title);
    // // setfetchData(true);
    // //console.log("ticket id: ", cardKey);
    // await axios.get(`${clientURL}/tickets/${ticketId}`, {withCredentials: true}).then((response) => {
    //   setTicket((ticket)=>{response.data});
    setShowModel((old) => {
      true;
    });
    //   console.log("ticket: ", ticket);
    document.getElementById("my_modal_3").showModal();

    //}).catch((error) => console.error("Could not fetch data", error));
  };

  // useEffect(() => {

  // }, [showModel]);

  useEffect(() => {
    console.log("Show Model: ", showModel);
    // if (showModel) {
    //   document.getElementById("my_modal_3").showModal();
    // }
  }, []);

  const inputDateCreation = new Date(creationDate);
  const inputDateResolution = new Date(resolutionDate);

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
        <div>
          Description:
          <p>{description}</p>
        </div>
        <div>
          Rating:
          <p>{rating}</p>
        </div>
        <div>
          Response:
          <p>{response}</p>
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

            {/* <ViewTicketForm
              title={title}
              description={description}
              status={status}
              priority={priority}
              mainIssue={mainIssue}
              subIssue={subIssue}
              rating={rating}
              response={response}
              creationDate={formattedDateCreation}
              resolutionDate={formattedDateResolution}
            /> */}
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TicketCardClient;
