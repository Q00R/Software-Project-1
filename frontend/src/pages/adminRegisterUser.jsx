import axios from "axios";
import { useEffect, useState } from "react";

export default function() {
    const [role, setRole] = useState("");
    const [agentRole, setAgentRole] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setRole("client");
        setAgentRole("Software");
    }, []);
    //{ username, email, password, DOB, name, address, role, mainRole }
    async function handleSubmit() {
        try {
            console.log(
                { username: document.getElementById("usernameInput").value, email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value, DOB: document.getElementById("dateInput").value,
            name: document.getElementById("nameInput").value, address: document.getElementById("addressInput").value,
            role, mainRole: agentRole}
            )
            setError("");
            setSuccess("");
            const res = await axios.post("http://localhost:3000/admin/createUser",
            { username: document.getElementById("usernameInput").value, email: document.getElementById("emailInput").value,
            password: document.getElementById("passwordInput").value, DOB: document.getElementById("dateInput").value,
            name: document.getElementById("nameInput").value, address: document.getElementById("addressInput").value,
            role, mainRole: agentRole}
            , { withCredentials: true }).then((res) => res)
            .catch((err) => err.response);
            console.log(res);
            if(!res.data.error){
                setSuccess("User created successfully");
            }else{
                setError(res.data.error);
            }
        }catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    console.log(role);
    return (
        <>
        <div className="min-h-screen bg-base-200">
            <div className="flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full shadow-2xl bg-base-100" style={{width: "46%", left:"27%"}}>
                    <form className="card-body" style={{width: "100%"}}>
                        <div className="font-bold text-4xl mb-2" style={{width: "100%"}}>Add User</div>
                        <div style={{display: "flex", width: "100%"}}>
                            <div style={{width: "100%"}}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input id="usernameInput" type="text" placeholder="username" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input id="emailInput" type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input id="passwordInput" type="password" placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date of Birth</span>
                                    </label>
                                    <input id="dateInput" type="date" className="input input-bordered" required />
                                </div>
                            </div>
                            <div style={{width: "100%"}}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input id="nameInput" type="text" placeholder="name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Address</span>
                                    </label>
                                    <input id="addressInput" type="text" placeholder="address" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Role</span>
                                    </label>
                                    <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn" style={{width:"100%"}}>{role}</div>
                                    <ul tabIndex={0} className="text-gray-600 mb-2 dropdown-content z-[1] menu p-2 shadow bg-gray-400 rounded-box w-40">
                                        <li>
                                            <a onClick={() => setRole("admin")}>Admin</a>
                                        </li>
                                        <li>
                                            <a onClick={() => setRole("agent")}>Agent</a>
                                        </li>
                                        <li>
                                            <a onClick={() => setRole("manager")}>Manager</a>
                                        </li>
                                        <li>
                                            <a onClick={() => setRole("client")}>Client</a>
                                        </li>
                                        </ul>
                                    </div>
                                </div>
                                {role === "agent" ? (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Agent Role</span>
                                    </label>
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn" style={{width:"100%"}}>{agentRole}</div>
                                        <ul tabIndex={0} className="text-gray-600 mb-2 dropdown-content z-[1] menu p-2 shadow bg-gray-400 rounded-box w-40">
                                            <li>
                                                <a onClick={() => setAgentRole("Software")}>Software</a>
                                            </li>
                                            <li>
                                                <a onClick={() => setAgentRole("Hardware")}>Hardware</a>
                                            </li>
                                            <li>
                                                <a onClick={() => setAgentRole("Network")}>Network</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        {
                            (success.length != 0 ?
                            <div role="alert" className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{success}</span>
                            </div>
                            : null)
                        }{
                            (error.length != 0 ? 
                            <div role="alert" className="alert alert-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>{error}</span>
                            </div>
                            : null)
                        }
                    </form>
                    <div className="mt-6">
                        <button className="btn btn-primary" style={{width:"100%"}} onClick={()=>{handleSubmit()}}>Add User</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}