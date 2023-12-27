import React, { useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [response, setResponse] = React.useState("");
  const callAPI = async () => {
    const question = document.getElementById("question").value;
    if (question) {
      try {
        await axios
          .get(`http://localhost:3000/openai/${question}`, {
            withCredentials: true,
          })
          .then((res) => {
            setResponse(res.data);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      callAPI();
    }
  };

  useEffect(() => {
    const searchResponse = document.getElementById("searchResponse");
    if (searchResponse) {
      searchResponse.showModal();
    }
  }, [response]);

  return (
    <div>
      <div className="rounded-full mx-2 flex items-center justify-center">
        <input
          id="question"
          className="rounded-full w-[90%] text-xl h-[45px] items-center p-2.5 border border-slate-gray mx-2 font-mono"
          type="text"
          placeholder="Type here your question..."
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn px-7 btn-active btn-circle btn-outline btn-primary mx-3 text-lg w-[100px] font-mono hover:brightness-110 hover:animate-pulse rounded-full bg-gradient-to-r from-primary to-secondary"
          onClick={callAPI}
        >
          Go!
        </button>
      </div>

      {response && (
      <dialog id="searchResponse" className="modal">
        <div className="modal-box  overflow-y-auto scrollbar-thin scrollbar-track-gray-50 scrollbar-track-rounded-md scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md font-mono">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Genie Says...</h3>
          <p className="py-4">{response}</p>
        </div>
      </dialog>
      )}
    </div>
  );
};

export default Search;
