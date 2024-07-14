//SearchBar.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";
//Add filtering
const SearchBar = ({ setSearchInput }) => {
  //const [input, setInput] = useState("");
  const handleChange = (e) => {
    setSearchInput(e.target.value); //Lift state up
  };
  return (
    <>
      <div className="input-wrapper ">
        <input
          placeholder="Type to search..."
          style={{ fontSize: "small" }}
          // value={input}
          // onChange={(e) => setInput(e.target.value)}
          onChange={handleChange} //Update state on change
        />
        &nbsp; <FaSearch id="search-icon" />
      </div>
    </>
  );
};

export default SearchBar;
