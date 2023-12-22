const TicketCardClient = ({ title, mainIssue, subIssue, priority, status }) => {
  return (
    <div className="card bg-base-100 shadow-xl m-2">
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div>
            <div
              className="badge badge-secondary bg-red-400 border-none"
            >
              {priority}
            </div>
            <div
              className="badge badge-secondary bg-violet-500 border-none"
            >
              {status}
            </div>
          </div>
        </h2>
        <div>
          <p>
            {mainIssue} : {subIssue}
          </p>
        </div>
        <button className="btn btn-primary">View Ticket</button>
      </div>
    </div>
  );
};

export default TicketCardClient;
