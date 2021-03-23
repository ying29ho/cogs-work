import React from "react";

const Error = ({error}) => {
  return (
    <>
      <div className="border-container">
        <h2 data-title="Something went wrong">Something went wrong</h2>
      {error}
      </div>
    </>
  );
};

export default Error;
