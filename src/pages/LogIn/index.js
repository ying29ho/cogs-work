// import Title from " ../../components/layout/title";
import { Input } from "../../components/form";
import Form from "react-bootstrap/Form";
import ThemeButton from "../../components/button";
import "./LogIn.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  border: 5px solid #ff286b;
  border-radius: 3px;
  border-bottom: 50px solid #ff286b;
  padding: 20px 30px 60px 30px;
  height: auto;
  width: 40%;
  transform: translateX(15%);
  margin: 230px auto 0 auto;

  h2 {
    background: #005678;
    height: 10vh;
    width: auto;
    margin: -100px 0 0 35px;
  }
  .form-group {
    padding-top: 30px;
    width: inherit;
    margin: 0 auto 0 auto;
  }
`;

const LogIn = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //send to api here or somewhere
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container">
      <div className="main">
        <Container>
          <h2 data-title="&nbsp;Log In&nbsp;">&nbsp;Log In&nbsp;</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Input
                label="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <ThemeButton
                variant="secondary"
                type="submit"
                block
                text="Log In"
              />
            </Form.Group>
          </Form>
        </Container>
      </div>
      <div className="side" />
    </div>
  );
};

export default LogIn;
