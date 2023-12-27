import { useState, useEffect } from "react";
import axios from "axios";
import thumbsup from "../assets/thumbsup.svg";
import thumbsdown from "../assets/thumbsdown.svg";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);
  const handleRating = (e) => {
    setSelected(true);
    setSelectedRating(parseInt(e.target.value, 10));
  };

  const handleSatisfied = async () => {
    try {
      console.log("getting agent id");
      console.log(mainIssue);
      const agentId = await axios
        .get(`http://localhost:3000/conversations/agentFind/${mainIssue}`, {
          withCredentials: true,
        })
        .then((response) => response.data);
      console.log("creating convo");
      await axios.post(
        "http://localhost:3000/conversations",
        {
          receiverId: agentId,
        },
        { withCredentials: true }
      );
      navigate("/messenger")
    } catch (error) {
      console.error("Error getting agent", error);
    }
  }

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
    <div className="card bg-base-100 shadow-xl m-1 w-[300px]">
      <div className="card-body text-balance h-[350px] overflow-y-auto scrollbar-thin scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md">
        <div>
          <h2 className="card-title">{title}</h2>
          <div>
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
            Current Rating: {rating}
            <br />
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

        {ticketStatus === "Closed" ? 
        <div>
          <h1>Are you satisfied with the response?</h1>
          <button>
            <img src={thumbsup} className="w-6 object-cover right-[41%] bottom-2 hover:bg-gray-200 rounded" />
          </button>
          <button onClick={handleSatisfied}>
            <img src={thumbsdown} className="w-6 object-cover right-[41%] bottom-2 hover:bg-gray-200 rounded" />
          </button>
        
        </div> : null}

        <div className="text-sm text-gray-300 mt-8">
          Created on:
          <p>{formattedDateCreation}</p>
        </div>

        {ticketStatus === "Closed" ? (
          <div className="text-sm text-gray-300">
            Resolved on:
            <p>{formattedDateResolution}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TicketCardClient;
