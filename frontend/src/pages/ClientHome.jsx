import { Search, ClientTickets, CreateTicket, FAQ } from "../sections";

const ClientHome = () => {
  return (
    <main className="relative flex">
  <div className="flex-grow m-2">
    <section>
      <Search />
    </section>
    <section className="m-4">
      <ClientTickets />
    </section>
    <section className="m-4">
      <CreateTicket />
    </section>
  </div>
  <div 
        style={{
          position: "sticky",
          top: 0,
          right: 0,
          width: "fit-content",
          height: "100%",
        }}>
    <section>
      <FAQ />
    </section>
  </div>
</main>

  );
};

export default ClientHome;
