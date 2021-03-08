import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 5px solid #ff286b;
  border-radius: 3px;
  border-bottom: 50px solid #ff286b;
  padding: 20px 20px 60px 20px;
  height: auto;
  width: 80%;
  transform: translateX(15%);
  margin-top: 100px;

  .card-deck {
    margin-right: 15px;
  }

  .card {
    margin-top: 35px;
  }

  h2 {
    background: #005678;
    height: 10vh;
    width: auto;
    margin: -100px 0 0 0;
  }
`;

const Error = ({error}) => {
  return (
    <>
      <Container>
        <h2 data-title="Something went wrong">Something went wrong</h2>
      {error}
      </Container>
    </>
  );
};

export default Error;
