import { Search, ClientTickets, CreateTicket, FAQ } from "../sections";

const ClientHome = () => {
  return (
    <div className="bg-base-100 w-full shadow-xl image-full">
      <div className="sticky">
        <main className="relative flex">
          <div className="w-3/4 m-2 grow">
            <section className=" border-blue-300 border-[2px] ">
              <Search />
            </section>
            <section className=" border-yellow-300 border-[2px] m-4">
              <ClientTickets />
            </section>
            <section className=" border-green-300 border-[2px] m-4">
              <CreateTicket />
            </section>
          </div>
          <div className="w-1/4 padding m-2 grow">
            <section className=" border-red-300 border-[2px]">
              <FAQ />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientHome;
