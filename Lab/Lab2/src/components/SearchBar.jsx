import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const SearchBar = ({ searchText, handleSearch }) => {
  return (
    <div className="mb-3 w-50 mx-auto">
      <InputGroup>
        <InputGroup.Text id="search-icon"></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm tên hoa lan..."
          aria-label="Search"
          aria-describedby="search-icon"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
