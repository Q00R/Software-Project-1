import React from "react";

const Search = () => {
  return (
    <div className="rounded-full mx-2 flex items-center justify-center">
      <input
        className="rounded-full w-[90%] text-2xl h-[45px] items-center p-2.5 border border-slate-gray mx-2"
        type="text"
        placeholder="Type here your question..."
      />
      <button className="btn px-7 btn-active btn-circle btn-outline btn-primary mx-3 text-lg w-[100px]">Go!</button>
    </div>
  );
};

export default Search;
