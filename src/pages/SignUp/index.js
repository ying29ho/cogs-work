// import Title from "../../components/layout/title";
import { Input, Checkbox } from "../../components/form";
import Form from "react-bootstrap/Form";
import ThemeButton from "../../components/button";

import "./SignUp.css";
import styled from "styled-components";
import { useFormik } from "formik";

const Container = styled.div`
  border: 5px solid #ff286b;
  border-radius: 3px;
  border-bottom: 50px solid #ff286b;
  padding: 20px 30px 60px 30px;
  height: auto;
  width: 40%;
  transform: translateX(15%);
  margin: 100px auto 0 auto;

  h2 {
    background: #005678;
    height: 10vh;
    width: auto;
    margin: -100px 0 0 15px;
  }

  .form-group {
    padding-top: 30px;
    width: inherit;
    margin: 0 auto 0 auto;
  }
`;

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password1: "",
      password2: "",
      subscribe: false,
    },
    onSubmit: (values) => {
      //send to api here
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container">
      <div className="main">
        <Container>
          <h2 data-title="&nbsp;Sign Up&nbsp;">&nbsp;Sign Up&nbsp;</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Input
                label="First Name"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              <Input
                label="Last Name"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
              />
              <Input
                label="Phone Number"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                placeholder="please enter a valid Brunei Number"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Please enter email"
              />
              <Input
                label="Password"
                name="password1"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password1}
                placeholder="Please enter password"
              />
              <Input
                label="Confirm Password"
                name="password2"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password2}
                placeholder="Please reenter password"
              />
              <Checkbox
                label="I would like to subscribe to the mailing list"
                name="subscribe"
                onChange={formik.handleChange}
                value={formik.values.subscribe}
              />
              <ThemeButton variant="secondary" block type="submit" text="Sign Up" />
            </Form.Group>
          </Form>
        </Container>
      </div>
      <div className="side" />
    </div>
  );
};

export default SignUp;
