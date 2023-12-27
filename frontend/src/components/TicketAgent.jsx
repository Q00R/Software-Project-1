import { useState, useEffect } from "react";
import axios from "axios";

const TicketAgent = ({
  priority,
  ticketStatus,
  title,
  description,
  creationDate,
  ticketId,
}) => {
  const [formData, setFormData] = useState({
    // dah 3shan el form data (for the ticket response)
    response: "",
    ticketStatus: "In Progress",
  });
  const backend_url = "http://localhost:3000/agent/respond";
  const [successMessage, setSuccessMessage] = useState(""); // dah 3shan el success message (for the alert)
  const [errorMessage, setErrorMessage] = useState(""); // dah 3shan el error message (for the alert)

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

  const closeAllAlerts = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };
  const submitTicketResponse = async () => {
    try {
      console.log(ticketId);
      const response = await axios.put(
        `${backend_url}/${ticketId}`,
        {
          response: formData.response,
          ticketStatus: formData.ticketStatus,
        },
        { withCredentials: true }
      );

      const { status: responseStatus, data } = response;
      if (responseStatus === 200) {
        setSuccessMessage("Ticket response submitted successfully");
        setErrorMessage("");
        console.log("200 OK:", data);
      } else {
        setErrorMessage("Couldn't submit ticket response");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Ana fel Catch");
      setSuccessMessage("");
    }
  };
  const getBodyOfTicketResponsePopUp = (e) => {
    // dah 3shan nemla el body beta3 el api (for the ticket response)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // if (formData.response && formData.ticketStatus) {
    //   setShowPopUp(!showPopUp);
    // }
  }, [formData]);
  return (
    <div className="bg-base-200 rounded-lg shadow-md p-4 my-2">
      <div className="bg-base-200 rounded-lg shadow-md p-4 w-[300px] h-[300px] text-wrap break-words">
        <div className="badge badge-secondary bg-secondary border-none mr-1">
          {priority}
        </div>
        <p className="badge badge-secondary bg-primary border-none">
          {ticketStatus}
        </p>
        <h1 className="text-2xl font-bold" style={{ marginTop: "10px" }}>
          {title}
        </h1>
        <div className="text-balance">
          <h2 className="text-xl" style={{ marginTop: "10px" }}>
            Description: {description}
          </h2>
        </div>
        <div text-balance="text-x1" style={{ marginTop: "10px" }}>
          <p className="text-xl">
            Created on:{" "}
            {new Date(creationDate).toLocaleString("en-US", options)}
          </p>
        </div>
      </div>
      {ticketStatus !== "Closed" && (
        <button
          className="btn btn-primary mt-4"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Respond to ticket
        </button>
      )}{" "}
      {/* check en el ticket status tkoon not resolved 3shan kol el ta7t yezhar */}
      <dialog id="my_modal_1" className="modal z-50">
        {" "}
        {/* teb2y make el id different le kol ticket bas maykonsh el ticket id */}
        <div className="modal-box p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-lg font-bold mb-4">Respond to the ticket!</h3>
          <textarea
            onChange={getBodyOfTicketResponsePopUp}
            name="response"
            placeholder="Response"
            value={formData.response}
            className="textarea textarea-bordered textarea-md w-full max-w-xs"
          ></textarea>
          <select
            onChange={getBodyOfTicketResponsePopUp}
            name="ticketStatus"
            value={formData.ticketStatus}
            className="select select-bordered select-primary w-full max-w-xs mt-4"
          >
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="mt-4">
            <button
              className="btn btn-primary"
              onClick={() => submitTicketResponse()} // make this in the same loop beta3 el view tickets (dah lazem ykoon el ticket id)
            >
              Submit
            </button>
            <button
              className="btn ml-2"
              onClick={() => {
                document.getElementById("my_modal_1").close();
                closeAllAlerts();
              }}
            >
              Close
            </button>

            {successMessage && (
              <div role="alert" className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{successMessage}</span>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    document.getElementById("my_modal_1").close();
                    closeAllAlerts();
                  }}
                >
                  Go Back
                </button>
              </div>
            )}

            {errorMessage && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    document.getElementById("my_modal_1").close();
                    closeAllAlerts();
                  }}
                >
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TicketAgent;
