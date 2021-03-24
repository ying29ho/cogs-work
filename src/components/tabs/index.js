import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import styled from "styled-components";

const Container = styled.div`
  .nav-tabs {
    border:none ;
    margin-top: 7rem;

  }
  .tab-content {
    background-color: #68a6bb;
    color: #d1f7ff;
    padding: 2rem;
    padding-top: 3rem;
    font-size: 1.5rem;
    box-shadow: -3px -3px 5px #004059;
  }

  .nav-link{
    color: #d1f7ff;
    background-color: #FF286B;
    border: none;
    font-size: 1.5rem;
  
  }

  .nav-link.active{
    color: #d1f7ff;
    background-color: #68a6bb;
    border: none;
    box-shadow: -3px -3px 5px #004059;
  }

  .nav-link.disabled{
    color: #4A9BBA;
    background-color: #9E1842;
    border: none;
  }
`;
const MainTab = ({ defaultActiveKey, desc, reviews }) => {
  return (
    <Container>
      <Tabs defaultActiveKey={defaultActiveKey}>
        <Tab eventKey="desc" title="Description">
          {desc}
        </Tab>
        <Tab eventKey="review" title="Reviews" disabled>
          {reviews}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MainTab;
