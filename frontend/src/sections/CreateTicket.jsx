import { useState, useEffect } from "react";
import axios from "axios";

const CreateTicket = () => {
  const clientURL = "http://localhost:3000/client";


  const [mainIssue, setMainIssue] = useState("");
  const [subIssue, setSubIssue] = useState("");
  const [workFlowGen, setWorkFlowGen] = useState(false);
  const [suggest, setSuggest] = useState([]);
  const [issues, setIssues] = useState([]);
  const [sumbitted, setSubmitted] = useState(false);
  const [prioritySelected, setPrioritySelected] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    mainIssue: "",
    subIssue: "",
  });

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

  useEffect(() => {
    const fetchWorkflow = async () => {
      if (mainIssue && subIssue && subIssue !== "Other") {
        setWorkFlowGen(true);
        try {
          const response = await axios.get(
            `${clientURL}/ticketrequest/?mainIssue=${mainIssue}&subIssue=${subIssue}`,
            { withCredentials: true }
          );
          setIssues(response.data[0].commonIssues);
          setSuggest(response.data[0].suggestions);
        } catch (error) {
          console.error("Error fetching workflow", error);
        }
      }
    };
    fetchWorkflow();
  }, [mainIssue, subIssue]);

  useEffect(() => {
    const submitForm = async () => {
      if (sumbitted) {
        try {
          const response = await axios.post(
            `${clientURL}/ticketrequest`,
            formData,
            { withCredentials: true }
          );
          console.log(response);
        } catch (error) {
          console.error("Error submitting form", error);
        }
      }
    };
    submitForm();
  }, [sumbitted]);

  const handleFormSubmission = () => {
    setSubmitted(true);
    setFormData({
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      priority: prioritySelected,
      mainIssue: mainIssue,
      subIssue: subIssue,
    });
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
      <div className="w-[60%] flex items-center  p-2.5 border border-slate-gray rounded-full">
        <button
          className="w-full btn btn-outline rounded-full text-2xl"
          onClick={() => document.getElementById("createForm").showModal()}
        >
          Open Ticket!
        </button>
      </div>

      <dialog id="createForm" className="modal">
        <div className="modal-box overflow-auto scrollbar-thin">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 className="text-2xl font-montserrat font-semibold mb-2 ">
            Create Ticket
          </h2>
          <form className="w-full">
            <div className="mb-3">
              <select
                className="select select-primary w-full max-w-xs"
                id="selectMainIssue"
                key="selectMainIssue"
                onChange={(event) => {
                  setMainIssue(() => event.target.value);
                }}
                value={mainIssue}
              >
                <option selected>Main Issue</option>
                <option id="Software">Software</option>
                <option id="Hardware">Hardware</option>
                <option id="Network">Network</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                key="selectSubIssue"
                className="select select-primary w-full max-w-xs"
                value={subIssue}
                onChange={(event) => {
                  setSubIssue(() => event.target.value);
                }}
              >
                <option selected>Sub Issue</option>
                {mainIssue === "Software"
                  ? subSoftware.map((subSoftware) => (
                      <option id={subSoftware}>{subSoftware}</option>
                    ))
                  : null}
                {mainIssue === "Hardware"
                  ? subHardware.map((subHardware) => (
                      <option id={subHardware}>{subHardware}</option>
                    ))
                  : null}
                {mainIssue === "Network"
                  ? subNetwork.map((subNetwork) => (
                      <option id={subNetwork}>{subNetwork}</option>
                    ))
                  : null}
                <option id="Other">Other</option>
              </select>
            </div>

            <div>
              {workFlowGen ? (
                <div className="mb-3">
                  <h1 className="font-medium text-xl text-gray-700">
                    Common Issues
                  </h1>
                  {issues.map((issue) => (
                    <div>
                      <p className="text-l font-normal text-gray-600">
                        {issue}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {workFlowGen ? (
                <div className="mb-3">
                  <h1 className="font-medium text-xl text-gray-700">
                    Possible Solutions
                  </h1>
                  {suggest.map((suggestion) => (
                    <div>
                      <p className="text-l font-normal text-gray-600">
                        {suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mb-3">
              {/* <label htmlFor="title" className="block">
                Title:
              </label> */}
              <input
                id="title"
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div >
              <div className="mb-3">
                <textarea
                  id="description"
                  className="textarea textarea-bordered w-full max-w-xs h-40 scrollbar-thin"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <select
                className="select select-primary w-full max-w-xs"
                id="selectPriority"
                value={prioritySelected}
                onChange={(event) => {
                  setPrioritySelected(() => event.target.value);
                }}
              >
                <option>Priority</option>
                <option id="High">High</option>
                <option id="Medium">Medium</option>
                <option id="Low">Low</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-400 text-white px-4 py-2 rounded-md"
              onClick={handleFormSubmission}
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
