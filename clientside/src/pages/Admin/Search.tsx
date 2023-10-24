import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ value, onChange }: any) => {
  return (
    <Sear>
      <div className="icon">
        <AiOutlineSearch size={23} />
      </div>
      <input
        type="text"
        placeholder="Search Post"
        value={value}
        onChange={onChange}
      />
    </Sear>
  );
};

const Sear = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    outline: 1px solid lightgrey;
    width: 30rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  .icon {
    position: absolute;
    right: .6rem;
  }
`;
export default Search;
