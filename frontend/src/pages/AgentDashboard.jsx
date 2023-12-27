import AgentTicket from '../components/AgentTicket';

const AgentDashboard = () => {
    return (
        <div className="bg-base-100 w-full shadow-xl image-full">
            <div className="overflow-y-auto">
                <main className="relative flex">
                    <div className="w-full m-2">
                        <section>
                            <AgentTicket />
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
                    </div>
                </main>
            </div>
        </div>
    );
};
export default AgentDashboard;

