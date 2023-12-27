import { Search, ClientTickets, CreateTicket, FAQ } from "../sections";
import AboutUs from "../components/AboutUs";

const ClientHome = () => {
  return (
    <main className="relative flex">
      <div className="flex-grow m-2">
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
        className=" padding m-2 grow"
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
      <section>
        <AboutUs />
      </section>
    </main>
  );
};

export default ClientHome;
