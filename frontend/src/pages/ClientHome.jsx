import { Search, ClientTickets, CreateTicket, FAQ } from "../sections";

const ClientHome = () => {
  return (
    <div className="bg-base-100 w-full shadow-xl image-full">
      <div className="sticky">
        <main className="relative flex">
          <div className="w-3/4 m-2 grow">
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
          <div className="w-1/4 padding m-2 grow">
            <section>
              <FAQ />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientHome;
