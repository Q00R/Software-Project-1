import { CreateTicket } from "../sections";
import CreateTicketForm from "./CreateTicketForm";

const TicketCardClient = ({ title, mainIssue, subIssue, priority, status }) => {
  return (
    <div className="card bg-base-100 shadow-xl m-2">
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div>
            <div className="badge badge-secondary bg-red-400 border-none">
              {priority}
            </div>
            <div className="badge badge-secondary bg-violet-500 border-none">
              {status}
            </div>
          </div>
        </h2>
        <div>
          <p>
            {mainIssue} : {subIssue}
          </p>
        </div>
        <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_3').showModal()}>View Ticket</button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <CreateTicketForm />
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TicketCardClient;
