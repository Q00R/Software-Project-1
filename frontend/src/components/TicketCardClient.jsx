import ViewTicketForm from "./ViewTicketForm";
import { useState, useEffect } from "react";
import axios from "axios";

const TicketCardClient = ({
  title,
  description,
  ticketStatus,
  priority,
  mainIssue,
  subIssue,
  rating,
  response,
  creationDate,
  resolutionDate,
}) => {
  const clientURL = "http://localhost:3000/client";

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
    <div className="card bg-base-100 shadow-xl m-1 w-[300px]">
      <div className="card-body text-balance h-[350px] overflow-y-auto scrollbar-thin scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md">
        <div className="text-balance">
          <h2 className="card-title">{title}</h2>
          <div className="text-balance">
            <div className="badge badge-secondary bg-secondary border-none mr-1">
              {priority}
            </div>
            <div className="badge badge-secondary bg-primary border-none">
              {ticketStatus}
            </div>
          </div>
        </div>
        <div>
          <p>
            {mainIssue} : {subIssue}
          </p>
        </div>
        <div className="text-wrap break-words">
          Description: 
          <p>{description}</p>
          </div>
        {ticketStatus === "Closed" ? (
          <div>
            Rating:
            <p>{rating}</p>
          </div>
        ) : null}
        {ticketStatus === "Closed" ? (
          <div>
            Response:
            <p>{response}</p>
          </div>
        ) : null}
        <div>
          Created on:
          <p>{formattedDateCreation}</p>
        </div>

        {ticketStatus === "Closed" ? (
          <div>
            Resolved on:
            <p>{formattedDateResolution}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TicketCardClient;
