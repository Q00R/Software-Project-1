import React from "react";
import axios from "axios";

const Search = () => {

  const callAPI = async () => {
    const question = document.getElementById("question").value;
    if (question) {
      try {
        const response = (await axios.get(`http://localhost:3000/openai/${question}`, { withCredentials: true })).data;
        window.alert(response);
      }
      catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className="rounded-full mx-2 flex items-center justify-center">
      <input id="question"
        className="rounded-full w-[90%] text-2xl h-[45px] items-center p-2.5 border border-slate-gray mx-2"
        type="text"
        placeholder="Type here your question..."
      />
      <button className="btn px-7 btn-active btn-circle btn-outline btn-primary mx-3 text-lg w-[100px]" onClick={callAPI}>Go!</button>
    </div>
  );
};

export default Search;
