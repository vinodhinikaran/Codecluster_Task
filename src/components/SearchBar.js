import React, { useState } from "react";

const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setTimeout(() => {
      onSearchChange(newSearchTerm);
    }, 300);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search..."
      aria-label="Search"
    />
  );
};

export default SearchBar;
