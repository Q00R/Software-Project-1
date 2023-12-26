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
  ticketId,
}) => {
  const [selectedRating, setSelectedRating] = useState(rating);
  const handleRating = (e) => {
    setSelectedRating(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    handleSubmit();
  }, [selectedRating]);

  const handleSubmit = async (e) => {
    try{
      console.log(selectedRating)
      const response = await axios.put(
        `http://localhost:3000/client/tickets/rate/${ticketId}`,
        {
          rating: selectedRating,
        },
        { withCredentials: true }
      );
      console.log(response);
    }
    catch(error){
      console.error(error);
    }
  }

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
              {ticketStatus}
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
        {ticketStatus === "Closed" ? (
          <div>
            Current Rating: {selectedRating}
            <br/>
            Change Your Rating: &nbsp;
            <div className="rating rating-md">
              
                <input type="radio" name="rating-5" value="1" className="mask mask-star-2 bg-orange-400" onChange={(e) => handleRating(e)}/>
                <input type="radio" name="rating-5" value="2" className="mask mask-star-2 bg-orange-400" onChange={(e) => handleRating(e)}/>
                <input type="radio" name="rating-5" value="3" className="mask mask-star-2 bg-orange-400" onChange={(e) => handleRating(e)}/>
                <input type="radio" name="rating-5" value="4" className="mask mask-star-2 bg-orange-400" onChange={(e) => handleRating(e)}/>
                <input type="radio" name="rating-5" value="5" className="mask mask-star-2 bg-orange-400" onChange={(e) => handleRating(e)}/>
            </div>
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
