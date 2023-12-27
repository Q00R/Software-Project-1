import { useState, useEffect } from 'react';
import axios from 'axios';

const AgentTicket = () => {

    const backend_url = 'http://localhost:3000/agent/respond';
    const agentURL = "http://localhost:3000/agent";

    const [statusChosen, setStatusChosen] = useState("All");
    const [statusAll, setStatusAll] = useState(false);
    const [sw, setSW] = useState([])
    const [hw, setHW] = useState([])
    const [nt, setNT] = useState([])
    const [successMessage, setSuccessMessage] = useState(''); // dah 3shan el success message (for the alert)
    const [errorMessage, setErrorMessage] = useState('');     // dah 3shan el error message (for the alert)

    const [formData, setFormData] = useState({                // dah 3shan el form data (for the ticket response)
        response: '',
        ticketStatus: 'In Progress',
    });

    const handleStatusActive = async () => {
        setStatusChosen("Active");
        await axios
            .get(`${agentURL}/viewActiveTickets`, {
                withCredentials: true,
            })
            .then((response) => {
                setSW(response.data.activeTickets.sw);
                setHW(response.data.activeTickets.hw);
                setNT(response.data.activeTickets.nt);
            })
            .catch((error) => console.error("Could not fetch InProgress", error));
    };

    const handleStatusResolved = async () => {
        setStatusChosen("Resolved");
        await axios
            .get(`${agentURL}/viewResolvedTickets`, {
                withCredentials: true,
            })
            .then((response) => {
                setSW(response.data.resolvedTickets.filter((ticket) => ticket.mainIssue === "Software"));
                setHW(response.data.resolvedTickets.filter((ticket) => ticket.mainIssue === "Hardware"));
                setNT(response.data.resolvedTickets.filter((ticket) => ticket.mainIssue === "Networks"));
            })
            .catch((error) => console.error("Could not fetch Resolved", error));
    };
    const handleStatusAll = async () => {
        setStatusChosen("All");
        await axios
            .get(`${agentURL}/viewAgentTickets`, { withCredentials: true })
            .then((response) => {
                setSW(response.data.allTickets.sw);
                setHW(response.data.allTickets.hw);
                setNT(response.data.allTickets.nt);
            })
            .catch((error) => console.error("Could not fetch data(All1)", error));
        setStatusAll(true);
    };
    useEffect(() => {
        if (statusChosen === "All") {
            axios
                .get(`${agentURL}/viewAgentTickets`, { withCredentials: true })
                .then((response) => {
                    setSW(response.data.allTickets.sw);
                    setHW(response.data.allTickets.hw);
                    setNT(response.data.allTickets.nt);
                })
                .catch((error) => console.error("Could not fetch data (All2)", error));
        }
        else {

        }
    }, []);
    useEffect(() => {
        // Fetch data from your backend when the component mounts
        axios.get('/viewActiveTickets:ticketId/:ticketStatus') // Replace with your actual backend URL and endpoint
            .then(response => {
                setData(response.data); // Set the received data in your component state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    // const [showPopUp, setShowPopUp] = useState(false);        
    useEffect(() => {
        // if (formData.response && formData.ticketStatus) {
        //   setShowPopUp(!showPopUp);
        // }
    }, [formData]);

    const getBodyOfTicketResponsePopUp = (e) => {               // dah 3shan nemla el body beta3 el api (for the ticket response)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitTicketResponse = async (id) => {
        try {
            const response = await axios.put(
                `${backend_url}/respond/${id}`,
                {
                    response: formData.response,
                    ticketStatus: formData.ticketStatus,
                },
                { withCredentials: true }
            );

            const { status: responseStatus, data } = response;
            if (responseStatus === 200) {
                setSuccessMessage('Ticket response submitted successfully');
                setErrorMessage('');
                console.log('200 OK:', data);
            } else {
                setErrorMessage("Couldn't submit ticket response");
                setSuccessMessage('');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Ana fel Catch");
            setSuccessMessage('');
        }
    };

    const closeAllAlerts = () => {
        setSuccessMessage('');
        setErrorMessage('');
    }
    // saving the ticket's (already saved) creation date:

    //using the creation date saved on the ticket in the db:
    // const inputDateCreation = 
    // const formattedDateCreation = inputDateCreation.toLocaleString(
    //     "en-US",
    //     options
    // );

    return (
        <main className='relative'>
            <section className='p-8'>
                <button id="InProgress" className="btn btn-primary mx-2" onClick={handleStatusActive}>Active</button>
                <button id="Closed" className="btn btn-primary mx-2" onClick={handleStatusResolved}>Resolved</button>
                <button id="All" className="btn btn-primary mx-2" onClick={handleStatusAll}>All</button>
            </section>
            <section className='p-8'>
                <h1 className="text-4xl font-bold mb-6 ml-4">Hardware Tickets</h1>
                <div className='flex flex-row overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200'>
                    <div className='flex flex-row items-start justify-start'>
                        {hw.map((ticket) => {
                            return (
                                <div className='bg-base-200 rounded-lg shadow-lg p-4'>
                                    <div className='bg-base-200 rounded-lg shadow-lg p-4'>
                                        <div className="badge badge-secondary bg-secondary border-none mr-1">{ticket.priority}</div>
                                        <p className='badge badge-secondary bg-primary border-none'>{ticket.ticketStatus}</p>
                                        <h1 className='text-2xl font-bold' style={{ marginTop: '10px' }}>{ticket.title}</h1>
                                        <div className='text-balance'>
                                            <h2 className='text-xl' style={{ marginTop: '10px' }}>Description: {ticket.description}</h2>
                                        </div>
                                        <div text-balance='text-x1' style={{ marginTop: '10px' }}>
                                            <p className='text-xl'>Created on: {ticket.creationDate}</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-4" onClick={() => document.getElementById('my_modal_1').showModal()}>Respond to ticket</button> {/* check en el ticket status tkoon not resolved 3shan kol el ta7t yezhar */}
                                    <dialog id="my_modal_1" className="modal z-50">           {/* teb2y make el id different le kol ticket bas maykonsh el ticket id */}
                                        <div className="modal-box p-6 bg-white rounded-lg shadow-lg text-center">
                                            <h3 className="text-lg font-bold mb-4">Respond to the ticket!</h3>
                                            <textarea
                                                onChange={getBodyOfTicketResponsePopUp}
                                                name="response"
                                                placeholder="Response"
                                                value={formData.response}
                                                className="textarea textarea-bordered textarea-md w-full max-w-xs"
                                            ></textarea>
                                            <select
                                                onChange={getBodyOfTicketResponsePopUp}
                                                name="ticketStatus"
                                                value={formData.ticketStatus}
                                                className="select select-bordered select-primary w-full max-w-xs mt-4"
                                            >
                                                <option value="In Progress">In Progress</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                            <div className="mt-4">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => submitTicketResponse("658a1a991595fe60182050e1")}  // make this in the same loop beta3 el view tickets (dah lazem ykoon el ticket id)
                                                >
                                                    Submit
                                                </button>
                                                <button className="btn ml-2" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Close</button>

                                                {successMessage && (
                                                    <div role="alert" className="alert alert-success">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        <span>{successMessage}</span>
                                                        <button className="btn btn-sm" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Go Back</button>
                                                    </div>
                                                )}

                                                {errorMessage && (
                                                    <div role="alert" className="alert alert-error">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        <span>{errorMessage}</span>
                                                        <button className="btn btn-sm" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Go Back</button>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>
            <section className='p-8'>
                <h1 className="text-4xl font-bold mb-6 ml-4">Software Tickets</h1>
                <div className='flex flex-row overflow-x-auto scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md'>
                    {sw.map((ticket) => {
                        return (
                            <div className='bg-base-200 rounded-lg shadow-lg p-4'>
                                <div className='bg-base-200 rounded-lg shadow-lg p-4'>
                                    <div className="badge badge-secondary bg-secondary border-none mr-1">{ticket.priority}</div>
                                    <h1 className='text-2xl font-bold'>{ticket.title}</h1>
                                    <p className='text-xl'>{ticket.description}</p>
                                    <p className='text-xl'>{ticket.ticketStatus}</p>
                                    <p className='text-xl'>{ticket.creactionDate}</p>
                                </div>
                                <button className="btn btn-primary mt-4" onClick={() => document.getElementById('my_modal_1').showModal()}>Respond to ticket</button> {/* check en el ticket status tkoon not resolved 3shan kol el ta7t yezhar */}
                                <dialog id="my_modal_1" className="modal z-50">           {/* teb2y make el id different le kol ticket bas maykonsh el ticket id */}
                                    <div className="modal-box p-6 bg-white rounded-lg shadow-lg text-center">
                                        <h3 className="text-lg font-bold mb-4">Respond to the ticket!</h3>
                                        <textarea
                                            onChange={getBodyOfTicketResponsePopUp}
                                            name="response"
                                            placeholder="Response"
                                            value={formData.response}
                                            className="textarea textarea-bordered textarea-md w-full max-w-xs"
                                        ></textarea>
                                        <select
                                            onChange={getBodyOfTicketResponsePopUp}
                                            name="ticketStatus"
                                            value={formData.ticketStatus}
                                            className="select select-bordered select-primary w-full max-w-xs mt-4"
                                        >
                                            <option value="In Progress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                        <div className="mt-4">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => submitTicketResponse("658a1a991595fe60182050e1")}  // make this in the same loop beta3 el view tickets (dah lazem ykoon el ticket id)
                                            >
                                                Submit
                                            </button>
                                            <button className="btn ml-2" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Close</button>

                                            {successMessage && (
                                                <div role="alert" className="alert alert-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{successMessage}</span>
                                                    <button className="btn btn-sm" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Go Back</button>
                                                </div>
                                            )}

                                            {errorMessage && (
                                                <div role="alert" className="alert alert-error">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{errorMessage}</span>
                                                    <button className="btn btn-sm" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Go Back</button>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className='p-8'>
                <h1 className="text-4xl font-bold mb-6 ml-4">Network Tickets</h1>
                <div className='flex flex-row overflow-x-auto scroll-smooth scrollbar-thin items-start justify-start scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md'>
                    {nt.map((ticket) => {
                        return (
                            <div className='bg-base-200 rounded-lg shadow-lg p-4'>
                                <div className='bg-base-200 rounded-lg shadow-lg p-4'>
                                    <div className="badge badge-secondary bg-secondary border-none mr-1">{ticket.priority}</div>
                                    <h1 className='text-2xl font-bold'>{ticket.title}</h1>
                                    <p className='text-xl'>{ticket.description}</p>
                                    <p className='text-xl'>{ticket.ticketStatus}</p>
                                    <p className='text-xl'>{ticket.creationDate}</p>
                                </div>
                                <button className="btn btn-primary mt-4" onClick={() => document.getElementById('my_modal_1').showModal()}>Respond to ticket</button> {/* check en el ticket status tkoon not resolved 3shan kol el ta7t yezhar */}
                                <dialog id="my_modal_1" className="modal z-50">           {/* teb2y make el id different le kol ticket bas maykonsh el ticket id */}
                                    <div className="modal-box p-6 bg-white rounded-lg shadow-lg text-center">
                                        <h3 className="text-lg font-bold mb-4">Respond to the ticket!</h3>
                                        <textarea
                                            onChange={getBodyOfTicketResponsePopUp}
                                            name="response"
                                            placeholder="Response"
                                            value={formData.response}
                                            className="textarea textarea-bordered textarea-md w-full max-w-xs"
                                        ></textarea>
                                        <select
                                            onChange={getBodyOfTicketResponsePopUp}
                                            name="ticketStatus"
                                            value={formData.ticketStatus}
                                            className="select select-bordered select-primary w-full max-w-xs mt-4"
                                        >
                                            <option value="In Progress">In Progress</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                        <div className="mt-4">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => submitTicketResponse("658a1a991595fe60182050e1")}  // make this in the same loop beta3 el view tickets (dah lazem ykoon el ticket id)
                                            >
                                                Submit
                                            </button>
                                            <button className="btn ml-2" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Close</button>

                                            {successMessage && (
                                                <div role="alert" className="alert alert-success">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{successMessage}</span>
                                                    <button className="btn btn-sm" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Go Back</button>
                                                </div>
                                            )}

                                            {errorMessage && (
                                                <div role="alert" className="alert alert-error">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{errorMessage}</span>
                                                    <button className="btn btn-sm" onClick={() => { document.getElementById('my_modal_1').close(); closeAllAlerts(); }}>Go Back</button>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main >
    );
}
export default AgentTicket