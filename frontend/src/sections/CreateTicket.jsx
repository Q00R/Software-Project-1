import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backend_url = "http://localhost:3000";

const CreateTicket = () => {
  const navigate = useNavigate();

  const clientURL = "http://localhost:3000/client";

  const [mainIssue, setMainIssue] = useState("Main Issue");
  const [subIssue, setSubIssue] = useState("Sub Issue");
  const [workFlowGen, setWorkFlowGen] = useState(false);
  const [suggest, setSuggest] = useState([]);
  const [issues, setIssues] = useState([]);
  const [sumbitted, setSubmitted] = useState(false);
  const [prioritySelected, setPrioritySelected] = useState("Priority");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    mainIssue: "",
    subIssue: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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
      } else if (subIssue === "Other") {
        console.log("other");
        try {
          console.log("getting agent id");
          console.log(mainIssue);
          const agentId = await axios
            .get(`http://localhost:3000/conversations/agentFindUid/${mainIssue}`, {
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
    };
    fetchWorkflow();

  }, [mainIssue, subIssue]);

  useEffect(() => {
    const submitForm = async () => {
      console.log("use effect bta3et el form");
      if (sumbitted) {
        try {
          document.getElementById("createForm").style.display = "none";
          const response = await axios.post(
            `${clientURL}/ticketrequest`,
            formData,
            { withCredentials: true }
          );
          console.log(response);
          window.alert("Your ticket has been submitted!");
        } catch (error) {
          console.error("Error submitting form", error);
        }
      }
    };
    submitForm();
  }, [sumbitted]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (
      prioritySelected === "Priority" ||
      mainIssue === "Main Issue" ||
      subIssue === "Sub Issue"
    ) {
      setErrorMessage("Please fill out all fields");
    } else {
      setSubmitted(true);
      setFormData({
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: prioritySelected,
        mainIssue: mainIssue,
        subIssue: subIssue,
      });
    }
  };

  return (
    <section
      className="max-container flex justify-between items-center"
      id="create-ticket"
    >
      <div>
        <h3 className="text-3xl leading-[50px] font-bold">
          Need Help?
        </h3>
        <h2 className="text-2xl">Open up a ticket!</h2>
      </div>
      <div className="w-[60%] flex items-center p-2.5 border border-slate-gray rounded-full">
        <button
          className="w-full btn btn-outline rounded-full text-2xl hover:brightness-110 hover:animate-pulse bg-gradient-to-r from-primary to-secondary"
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
          <h2 className="text-2xl font-semibold mb-2 ">
            Create Ticket
          </h2>
          <form className="w-full">
            <div className="mb-3">
              <select
                required
                className="select select-primary w-full max-w-xs text-lg"
                id="selectMainIssue"
                key="selectMainIssue"
                onChange={(event) => {
                  setMainIssue(() => event.target.value);
                }}
                value={mainIssue}
                defaultValue="Main Issue"
              >
                <option>Main Issue</option>
                <option id="Software">Software</option>
                <option id="Hardware">Hardware</option>
                <option id="Network">Network</option>
              </select>
            </div>
            <div className="mb-3">
              <select
                required
                key="selectSubIssue"
                className="select select-primary w-full max-w-xs text-lg"
                value={subIssue}
                onChange={(event) => {
                  setSubIssue(() => event.target.value);
                }}
                defaultValue="Sub Issue"
              >
                <option >Sub Issue</option>
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
                      <p className="text-lg font-normal text-gray-600">
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
                      <p className="text-lg font-normal text-gray-600">
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
                required
                id="title"
                type="text"
                placeholder="Title"
                className="input input-bordered w-full max-w-xs text-lg"
              />
            </div>

            <div>
              <div className="mb-3">
                <textarea
                  required
                  id="description"
                  className="textarea textarea-bordered w-full max-w-xs h-40 scrollbar-thin text-lg"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
            <div className="mb-3">
              <select
                required
                className="select select-primary w-full max-w-xs text-lg"
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
            <div>
              <button
                type="submit"
                className="bg-blue-400 text-white px-4 py-2 rounded-md text-lg"
                onClick={(e) => handleFormSubmission(e)}
              >
                Submit
              </button>

              {errorMessage && (
                <div
                  role="alert"
                  className="alert alert-error my-2"
                  id="errorBanner"
                >
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
                </div>
              )}
            </div>
          </form>
        </div>
      </dialog>

      {/* {isFormVisible && <CreateTicketForm />} */}
    </section>
  );
};

export default CreateTicket;
