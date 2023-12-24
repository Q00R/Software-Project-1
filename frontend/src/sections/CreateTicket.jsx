import { useState, useEffect } from "react";
import axios from "axios";

const CreateTicket = () => {
  const [mainIssue, setMainIssue] = useState("");
  const [subIssue, setSubIssue] = useState("");
  const [workFlow, setWorkFlow] = useState();

  const subSoftware = [
    "Operating System",
    "Application Software",
    "Custom Software",
    "Integration Issues",
  ];
  const subHardware = [
    "Desktops",
    "Laptops",
    "Printers",
    "Servers",
    "Network Equipment",
  ];
  const subNetwork = [
    "Email Issues",
    "Internet Connection Problems",
    "Website Errors",
  ];
  const handleFormSubmission = () => {
    console.log("Form Submitted");
  };

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
        <button
          className="w-full btn btn-outline rounded-full text-2xl"
          onClick={() => document.getElementById("createForm").showModal()}
        >
          {/* onClick={(event) => handleFormSubmission(event)} onClick={setFormVisibility(!isFormVisible)} */}
          Open Ticket!
        </button>
      </div>

      <dialog id="createForm" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="text-2xl font-montserrat font-semibold mb-2 ">
            Create Ticket
          </h2>
          <form className="w-full mx-2">
            <div className="mb-3">
              <select
                className="select select-primary w-full max-w-xs"
                id="selectMainIssue"
                onChange={(event) => {
                  setMainIssue(event.target.value);
                }}
                value="Main Issue"
              >
                <option disabled>Main Issue</option>
                <option id="Software">Software</option>
                <option id="Hardware">Hardware</option>
                <option id="Network">Network</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                className="select select-primary w-full max-w-xs"
                id="selectSubIssue"
                onChange={(event) => {
                  setSubIssue(event.target.value);
                }}
                value="Sub Issue"
              >
                <option disabled>Sub Issue</option>
                {mainIssue === "Software"
                  ? subSoftware.map((subSoftware) => (
                      <option id={subSoftware}>{subSoftware}</option>
                    ))
                  : null}
                {mainIssue.value === "Hardware"
                  ? subHardware.map((subHardware) => (
                      <option id={subHardware}>{subHardware}</option>
                    ))
                  : null}
                {mainIssue.value === "Network"
                  ? subNetwork.map((subNetwork) => (
                      <option id={subNetwork}>{subNetwork}</option>
                    ))
                  : null}
              </select>
            </div>
            <div className="mb-3">WorkFlow</div>
            <div className="mb-3">
              {/* <label htmlFor="title" className="block">
                Title:
              </label> */}
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div>
              <div className="mb-3">
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <select
                className="select select-primary w-full max-w-xs"
                id="selectPriority"
                value="Priority"
                onChange={(event) => {}}
              >
                <option disabled>
                  Priority
                </option>
                <option id="High">High</option>
                <option id="Medium">Medium</option>
                <option id="Low">Low</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-400 text-white px-4 py-2 rounded-md" onClick={handleFormSubmission}
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>

      {/* {isFormVisible && <CreateTicketForm />} */}
    </section>
  );
};

export default CreateTicket;
