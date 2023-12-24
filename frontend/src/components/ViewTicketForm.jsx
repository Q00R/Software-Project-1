import {useState, useEffect} from "react"
import axios from "axios"

const ViewTicketForm = ({
  title,
  description,
  status,
  priority,
  mainIssue,
  subIssue,
  rating,
  response,
  creationDate,
  resolutionDate
}) => {
  

  
  return (
    <div className="inset-0 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md w-[80%] mx-2">
        <div className="mb-4">
          <h2 className="text-2xl font-montserrat font-semibold mb-1 ">
            Ticket
          </h2>
          <div className="badge badge-secondary bg-secondary border-none  mx-1">
            {status}
          </div>
          <div className="badge badge-secondary bg-primary border-none mx-1 ">
            {priority}
          </div>
        </div>
        <form className="w-full mx-2">
          <div className="mb-3">
            {mainIssue} : {subIssue}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block">
              Title: {title}
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block">
              Description:
            </label>
            {description}
          </div>
          {status === "Closed" ? (
            <div className="mb-3">
              <label htmlFor="name" className="block">
                Response:
              </label>
              {response}
            </div>
          ) : null}
          {status === "Closed" ? (
            <div className="mb-3">
              <label htmlFor="name" className="block">
                Rating: {rating}
              </label>
            </div>
          ) : null}

          <div>
            <div className="mb-3">
              <label htmlFor="name" className="block">
                Created on: {creationDate}
              </label>
            </div>

            {status === "Closed" ? (
              <div className="mb-3">
                <label htmlFor="name" className="block">
                  Resolved on:
                </label>
                {resolutionDate}
              </div>
            ) : null}
          </div>

          {/* <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default ViewTicketForm;
