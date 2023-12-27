import { useState, useEffect } from "react";
import axios from "axios";
import TicketAgent from "../components/TicketAgent";
import AboutUs from "../components/AboutUs";

const AgentDashboard = () => {
  const backend_url = "http://localhost:3000/agent/respond";
  const agentURL = "http://localhost:3000/agent";

  const [statusChosen, setStatusChosen] = useState("All");
  const [statusAll, setStatusAll] = useState(false);
  const [sw, setSW] = useState([]);
  const [hw, setHW] = useState([]);
  const [nt, setNT] = useState([]);


  const handleStatusActive = async () => {
    setStatusChosen("Active");
    await axios
      .get(`${agentURL}/viewActiveTickets`, {
        withCredentials: true,
      })
      .then((response) => {
        setSW(response.data.activeTickets.sw);
        setHW(response.data.activeTickets.hw);
        setNT(response.data.activeTickets.nt);
      })
      .catch((error) => console.error("Could not fetch InProgress", error));
  };

  const handleStatusResolved = async () => {
    setStatusChosen("Resolved");
    await axios
      .get(`${agentURL}/viewResolvedTickets`, {
        withCredentials: true,
      })
      .then((response) => {
        setSW(
          response.data.resolvedTickets.filter(
            (ticket) => ticket.mainIssue === "Software"
          )
        );
        setHW(
          response.data.resolvedTickets.filter(
            (ticket) => ticket.mainIssue === "Hardware"
          )
        );
        setNT(
          response.data.resolvedTickets.filter(
            (ticket) => ticket.mainIssue === "Networks"
          )
        );
      })
      .catch((error) => console.error("Could not fetch Resolved", error));
  };
  const handleStatusAll = async () => {
    setStatusChosen("All");
    await axios
      .get(`${agentURL}/viewAgentTickets`, { withCredentials: true })
      .then((response) => {
        setSW(response.data.allTickets.sw);
        setHW(response.data.allTickets.hw);
        setNT(response.data.allTickets.nt);
      })
      .catch((error) => console.error("Could not fetch data(All1)", error));
    setStatusAll(true);
  };
  useEffect(() => {
    if (statusChosen === "All") {
      axios
        .get(`${agentURL}/viewAgentTickets`, { withCredentials: true })
        .then((response) => {
          setSW(response.data.allTickets.sw);
          setHW(response.data.allTickets.hw);
          setNT(response.data.allTickets.nt);
        })
        .catch((error) => console.error("Could not fetch data (All2)", error));
    } else {
    }
  }, []);
  return (
    <div>
      <main className="relative">
        <div className="w-full m-2">
          <main className="relative flex-col font-mono">
            <section>
              <button
                id="InProgress"
                className="btn btn-primary ml-9 mx-3 text-lg w-[120px] hover:brightness-110 hover:animate-pulse rounded-full bg-gradient-to-r from-primary to-secondary"
                onClick={handleStatusActive}
              >
                Active
              </button>
              <button
                id="Closed"
                className="btn btn-primary m-1 mx-3 text-lg w-[120px] hover:brightness-110 hover:animate-pulse rounded-full bg-gradient-to-r from-primary to-secondary"
                onClick={handleStatusResolved}
              >
                Resolved
              </button>
              <button
                id="All"
                className="btn btn-primary m-1 mx-3 text-lg w-[120px] hover:brightness-110 hover:animate-pulse rounded-full bg-gradient-to-r from-primary to-secondary"
                onClick={handleStatusAll}
              >
                All
              </button>
            </section>
            <section className="p-8 ">
              <h1 className="text-4xl font-bold mb-6 ml-4">Hardware Tickets</h1>
              <div className="flex flex-row overflow-x-scroll scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-transparent scrollbar-track-rounded-md hover:scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md ">
                <div className="flex flex-row items-start justify-start gap-3">
                  {hw.map((element) => (
                    console.log(element._id),
                    <TicketAgent
                      key={element._id}
                      title={element.title}
                      description={element.description}
                      priority={element.priority}
                      ticketStatus={element.ticketStatus}
                      creationDate={element.creationDate}
                      ticketId={element._id}
                    />
                  ))}
                </div>
              </div>
            </section>
            <section className="p-8">
              <h1 className="text-4xl font-bold mb-6 ml-4">Software Tickets</h1>
              <div className="flex flex-row overflow-x-scroll scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-transparent scrollbar-track-rounded-md hover:scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md gap-3">
                {sw.map((element) => (
                  <TicketAgent
                    key={element._id}
                    ticketId={element._id}
                    {...element}
                  />
                ))}
              </div>
            </section>
            <section className="p-8">
              <h1 className="text-4xl font-bold mb-6 ml-4">Network Tickets</h1>
              <div className="flex flex-row overflow-x-scroll scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-transparent scrollbar-track-rounded-md hover:scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md gap-3">
                {nt.map((element) => (
                  <TicketAgent
                    key={element._id}
                    ticketId={element._id}
                    {...element}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </main>
      <section>
        <AboutUs />
      </section>
    </div>
  );
};
export default AgentDashboard;
