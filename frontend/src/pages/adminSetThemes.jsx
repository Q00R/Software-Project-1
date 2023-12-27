import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminSetThemes() {

    const [Themes, setThemes] = useState([]);

    const fetchThemes = async () => {
        const res = await axios.get("http://localhost:3000/admin/viewThemes", { withCredentials: true });
        setThemes(res.data);
    };
    useEffect(() => {
        fetchThemes();
    }, []);

    const handleCreateTheme = async (event) => {
        const res = await axios.post("http://localhost:3000/admin/createTheme", {
            name: document.getElementById("themeNameCreate").value,
        }, { withCredentials: true });
        fetchThemes();
    }

    const handleDeleteTheme = async (event) => {
        const res = await axios.post("http://localhost:3000/admin/deleteTheme", {
            themeName: document.getElementById("themeNameDelete").value,
        },
        { withCredentials: true });
        fetchThemes();
    }

    const handleUpdateTheme = async (_id, active) => {
        console.log(_id, active);
        const res = await axios.put("http://localhost:3000/admin/updateTheme", {
            _id: _id,
            active: active,
        },
        { withCredentials: true });
        fetchThemes();
        
        window.dispatchEvent(new CustomEvent("themeChange"));
    }

    return (
        <div style={{width:"100%"}}>
            {/* <div style={{marginRight:"25%", marginLeft:"25%", marginBottom:"5%", marginTop:"5%", width:"50%"}}>
                <div className="col-span-1">
                    <div className="card shadow-lg compact side bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">Create Theme</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Theme Name</span>
                                </label>
                                <input id="themeNameCreate" type="text" placeholder="Theme Name" name="themeName" className="input input-bordered" />
                            </div>
                            <button onClick={handleCreateTheme} className="btn btn-primary">Create Theme</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="grid grid-cols-3 gap-4">
                {Themes.map((theme, index) => (
                    <div className="col-span-1" key={index}>
                        <div className="card shadow-lg compact side bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title">{theme.themeName}</h2>
                                <div className="form-control">
                                    <div className="dropdown dropdown-top">
                                        <div
                                        tabIndex={0}
                                        role="button"
                                        style={{width:"100%"}}
                                        className={`btn rounded-full justify-center items-center`}
                                        >
                                        {theme.active ? "Active" : "Hidden"}
                                        </div>
                                        <ul tabIndex={0} style={{right:0}} className="text-gray-600 dropdown-content z-[1] menu shadow bg-gray-400 rounded-box">
                                            <li>
                                                <a onClick={() => handleUpdateTheme(theme._id, true)}>Active</a>
                                            </li>
                                            <li>
                                                <a onClick={() => handleUpdateTheme(theme._id, false)}>Hidden</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-control">
                                    <button onClick={()=> {handleDeleteTheme(theme._id)}} className="btn btn-primary">Delete Theme</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}