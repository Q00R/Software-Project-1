import { Search, ClientTickets, CreateTicket, FAQ } from "../sections";
import AboutUs from "../components/AboutUs";

const ClientHome = () => {
  return (
    <div>
      <main className="relative flex">
        <div className="w-[80%] m-2 left-0">
          <section>
            <Search />
          </section>
          <section className="m-4 font-mono">
            <ClientTickets />
          </section>
          <section className="m-4 font-mono">
            <CreateTicket />
          </section>
        </div>
        <div
          className=" padding m-2"
          style={{
            position: "sticky",
            top: 0,
            right: 0,
            width: "fit-content",
            height: "100%",
          }}
        >
          <section>
            <FAQ />
          </section>
        </div>
      </main>
      <section>
        <AboutUs />
      </section>
    </div>
  );
};

export default ClientHome;
