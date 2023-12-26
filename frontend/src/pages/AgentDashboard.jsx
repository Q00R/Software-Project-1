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