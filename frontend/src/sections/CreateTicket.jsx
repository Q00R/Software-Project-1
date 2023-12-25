import { useState, useEffect } from "react";
import CreateTicketForm from "../components/CreateTicketForm";
import axios from "axios";

const CreateTicket = () => {
    const [isFormVisible, setFormVisibility] = useState(false);

    handleFormSubmission(event)
    {
      useEffect(() =>
      {
          axios.post()
      })
    }
  return (
    <section
      className="max-container flex justify-between items-center"
      id="create-ticket"
    >
      <div>
        <h3 className="text-3xl leading-[50px] font-palaquin font-bold">
          Need Help?
        </h3>
        <h2 className="text-2xl mx-2">Open up a ticket!</h2>
      </div>
      <div className="w-[60%] flex items-center   p-2.5 border border-slate-gray rounded-full">
        <button className="w-full btn btn-outline rounded-full text-2xl" onClick={(event) => handleFormSubmission(event)}> {/* onClick={setFormVisibility(!isFormVisible)}> */}
          Open Ticket!
        </button>
      </div>
    
        {/* {isFormVisible && <CreateTicketForm />} */}
        
    </section>
  );
};

export default CreateTicket;
