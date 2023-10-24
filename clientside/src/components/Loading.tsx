import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
      <Loader className="flex items-center justify-center h-screen w-100%">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
        </div>
      </Loader>
  );
};


const Loader = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  z-index:11;
  background:rgba(0,0,0,0.9)
`

export default Loading;
