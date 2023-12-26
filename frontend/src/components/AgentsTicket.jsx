const AgentTicket = ({
    id,
    title,
    description,
    priority,
    mainIssue,
    subIssue,
}) => {
    return (
        < div className="card bg-base-100 shadow-xl m-1" >
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div>
                        <div className="badge badge-secondary bg-secondary border-none">
                            {priority}
                        </div>
                        <div className="badge badge-secondary bg-primary border-none">
                            {ticketStatus}
                        </div>
                    </div>
                </h2>
                <div>
                    <p>
                        {mainIssue} : {subIssue}
                    </p>
                </div>
                <div>
                    Description:
                    <p>{description}</p>
                </div>
            </div>
        </div >
    );
}
export default AgentTicket