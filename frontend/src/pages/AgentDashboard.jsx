import { useState, useEffect } from 'react';
import axios from 'axios';
//const AgentDashboard = () => {
    // const [filter, setFilter] = useState('All'); // State to manage the active filter
    // const [data, setData] = useState(null);

    const backend_url = 'http://localhost:3000/agent';


    // useEffect(() => {
    //     // Fetch data from your backend when the component mounts
    //     axios.get('/viewActiveTickets:ticketId/:ticketStatus') // Replace with your actual backend URL and endpoint
    //         .then(response => {
    //             setData(response.data); // Set the received data in your component state
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    const AgentDashboard = () => {
        const [successMessage, setSuccessMessage] = useState(''); // dah 3shan el success message (for the alert)
        const [errorMessage, setErrorMessage] = useState('');     // dah 3shan el error message (for the alert)
        const [formData, setFormData] = useState({                // dah 3shan el form data (for the ticket response)
            response: '',
            ticketStatus: 'Closed',
        });
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
    
        return (
            <main className='relative'>
                <section className='p-8'>
                    <h1 className="text-4xl font-bold mb-6 ml-4">Hardware Tickets</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="card bg-base-100 shadow-lg p-4">
                            <h2 className="text-xl font-bold mb-2">Ticket1 + user ID</h2>
                            <div className="flex space-x-2 mb-4">
                                <span className="badge bg-red-500">High</span>
                                <span className="badge bg-violet-500">Progress</span>
                            </div>
                            <p className="text-gray-600">Description of the ticket</p>
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
                                        <button className="btn ml-2" onClick={() => {document.getElementById('my_modal_1').close(); closeAllAlerts();}}>Close</button>

                                        {successMessage && (
                                            <div role="alert" className="alert alert-success">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{successMessage}</span>
                                                <button className="btn btn-sm" onClick={() => {document.getElementById('my_modal_1').close(); closeAllAlerts();}}>Go Back</button>
                                            </div>
                                        )}

                                        {errorMessage && (
                                            <div role="alert" className="alert alert-error">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{errorMessage}</span>
                                                <button className="btn btn-sm" onClick={() => {document.getElementById('my_modal_1').close(); closeAllAlerts();}}>Go Back</button>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </section>
            </main>
        );
    };
//}
export default AgentDashboard;



// dah el previous code 👾
// import { useState } from 'react';
// const AgentDashboard = () => {
//   const [filter, setFilter] = useState('All'); // State to manage the active filter

//   // Function to filter tickets based on the selected category
//   const filterTickets = (category) => {
//     setFilter(category);
//     // Filter logic here:
//     // 1. Get all the tickets
//     // 2. Filter the tickets based on the category
//     // 3. Set the filtered tickets according to the state
//   };
//   return (
//     <main className='relative'>
//       <section className='padding-x sm:py-8 py-6 w-full'>
//         <h1 className="text-4xl font-bold mb-6 ml-4">Hardware Tickets</h1>
//         <div className="flex gap-4">
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket1 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'red', border: 'none' }}>High</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'violet', border: 'none' }}>Progress</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket2 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'orange', border: 'none' }}>Medium</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket3 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'red', border: 'none' }}>High</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket4 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'green', border: 'none' }}>Low</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'violet', border: 'none' }}>Progress</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket5 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'red', border: 'none' }}>High</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div>
//             <button onClick={() => filterTickets('Resolved')}>Resolved</button>
//             <button onClick={() => filterTickets('Progress')}>Progress</button>
//             <button onClick={() => filterTickets('All')}>All</button>
//           </div>
//         </div>
//       </section>
//       <section className='padding-x sm:py-8 py-6 w-full'>
//         <h1 className="text-4xl font-bold mb-6 ml-4">Software Tickets</h1>
//         <div className="flex gap-4">
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket1 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'green', border: 'none' }}>Low</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'violet', border: 'none' }}>Progress</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket2 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'orange', border: 'none' }}>Medium</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket3 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'red', border: 'none' }}>High</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'violet', border: 'none' }}>Progress</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket4 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'green', border: 'none' }}>Low</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket5 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'red', border: 'none' }}>High</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div>
//             <button onClick={() => filterTickets('Resolved')}>Resolved</button>
//             <button onClick={() => filterTickets('Progress')}>Progress</button>
//             <button onClick={() => filterTickets('All')}>All</button>
//           </div>
//         </div>
//       </section>
//       <section className='padding-x sm:py-8 py-6 w-full'>
//         <h1 className="text-4xl font-bold mb-6 ml-4">Network Tickets</h1>
//         <div className="flex gap-4">
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket1 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'orange', border: 'none' }}>Medium</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'violet', border: 'none' }}>Progress</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket2 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'orange', border: 'none' }}>Medium</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket3 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'red', border: 'none' }}>High</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'violet', border: 'none' }}>Progress</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket4 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'green', border: 'none' }}>Low</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'violet', border: 'none' }}>Progress</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div className="card w-62 bg-base-100 shadow-xl mt-2">
//             <div className="card-body">
//               <h2 className="card-title">
//                 Ticket5 + user ID
//                 <div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'green', border: 'none' }}>Low</div>
//                   <div className="badge badge-secondary" style={{ backgroundColor: 'purple', border: 'none' }}>Resolved</div>
//                 </div>
//               </h2>
//               <p>Description of the ticket</p>
//               <button className="btn btn-primary">View Ticket</button>
//             </div>
//           </div>
//           <div>
//             <button onClick={() => filterTickets('Resolved')}>Resolved</button>
//             <button onClick={() => filterTickets('Progress')}>Progress</button>
//             <button onClick={() => filterTickets('All')}>All</button>
//           </div>
//         </div>
//       </section>
//     </main >
//   )
// }

// export default AgentDashboard
