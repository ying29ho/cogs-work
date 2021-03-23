import React from "react";

import styled from "styled-components";
import "./Policies.css";

const Container = styled.div`
 
  @media (max-width: 770px) {
    margin: 180px 0 0 -40px;
  }
`;

const Policies = () => {
  return (
    <Container className="border-container">
      <h2 data-title="&nbsp;Policies&nbsp;">&nbsp;Policies&nbsp;</h2>

      <h3>Shipping & Pick-Up Policy</h3>
      <hr />
      <p>
        We currently do not ship outside of Brunei Darussalam.
        <br />
        <br />
        Pos Laju is available for all 4 districs of Brunei. The cost of shipping
        will vary according to location and weight of items. Shipping cost can
        be calulated at the end of checkout.
        <br />
        <br />
        Pick-Up can be made at our office in Brunei-Muara. The address will be
        emailed to you once you have confirmed your order.
      </p>

      <h3>Warranty & Return Policy</h3>
      <hr />
      <p>
        All items have been tested beforehand and are guarantee to work. Items
        sold are not refundable or exchangeable.
      </p>

      <h3>Contact US</h3>
      <hr />
      <p>
        Should you have any other questions, you can reach us at the following:
        <br />
        <br />
        Email
        <br />
        Instagram:
        <br />
        Whatsapp:
      </p>
    </Container>
  );
};

export default Policies;
