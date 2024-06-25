import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";
const SearchBar = () => {
  const [input, setInput] = useState("");
  return (
    <>
      <div className="input-wrapper">
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        &nbsp; <FaSearch id="search-icon" />
      </div>
    </>
  );
};

export default SearchBar;
