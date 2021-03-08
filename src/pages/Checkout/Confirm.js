import React from "react";
import Button from "../../components/button";
import { Link } from "react-router-dom";

import styled from "styled-components";
import "./checkout.css";

const Container = styled.div`
  border: 5px solid #ff286b;
  border-radius: 3px;
  border-bottom: 50px solid #ff286b;
  padding: 20px 20px 60px 20px;

  height: auto;
  width: 80%;
  transform: translateX(15%);
  margin-top: 100px;

  h2 {
    background: #005678;
    height: 10vh;
    width: auto;
    margin: -100px 0 0 0;
  }

  .btn-secondary {
    float: right;
  }
`;


const Confirm = () => {
  return (
    <Container>
      <h2 data-title="&nbsp;Order Confirm&nbsp;">
        &nbsp;Order Confirm&nbsp;
      </h2>
      <h3 style={{ margin: "1em 0 1em 1em" }}>
        Your order has been confirmed. Please check your email for further instructions.
      </h3>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="/">
        <Button text="Back to Homepage" />
      </Link>
    </Container>
  );
};

export default Confirm;
