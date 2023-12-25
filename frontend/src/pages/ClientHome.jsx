import { Search, ClientTickets, CreateTicket, FAQ } from "../sections";

const ClientHome = () => {
  return (
    <div className="bg-base-100 w-full shadow-xl image-full">
      <div className="overflow-y-auto">
        <main className="relative flex">
          <div className="w-3/4 m-2">
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
            className="w-1/4 padding m-2 grow"
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
      </div>
    </div>
  );
};

export default ClientHome;
