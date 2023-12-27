import AgentTicket from "../components/AgentTicket";
import AboutUs from "../components/AboutUs";

const AgentDashboard = () => {
  return (
      <div>
        <main className="relative">
          <div className="w-full m-2">
            <section>
              <AgentTicket />
            </section>
          </div>
        </main>
        <section>
        <AboutUs />
      </section>
      </div>
  );
};
export default AgentDashboard;
