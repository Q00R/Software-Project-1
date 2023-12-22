const TicketCardClient = ({ title, mainIssue, subIssue, priority, status }) => {
  return (
    <div className="card bg-base-100 shadow-xl m-2">
      <div className="card-body">
        <h2 className="card-title">
          {title}
        </h2>
        <div>
        <div id="status" className="badge badge-secondary">{status}</div>
          <div id="priority" className="badge badge-secondary">{priority}</div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">View</button>
          <div className="badge badge-outline">{mainIssue}</div>
          <div className="badge badge-outline">{subIssue}</div>
        </div>
      </div>
    </div>
  );
};

export default TicketCardClient;
