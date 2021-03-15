import React from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

const Container = styled.div`
  label {
    color: #ff286b;
    text-align: left;
    font-size: 2rem;
    margin: 0;
  }

  .form-control {
    background-color: #4a9bba;
    color: #d1f7ff;
    border: none;
    margin: 0 0 20px 0;
    font-size: 1.5rem;
    height: 5vh;
  }

  .form-control::placeholder {
    color: #d1f7ff;
  }
  .form-control::-ms-input-placeholder {
    color: #d1f7ff;
  }
  .form-control:-ms-input-placeholder {
    color: #d1f7ff;
  }

  .custom-control-label::after {
    background: #4a9bba;
    border-radius: 3px;
    border: none;
    font-size: 2rem;
    color: #d1f7ff;
  }
  .custom-control-label:checked {
    background: #4a9bba;
    border-radius: 3px;
    border: none;
    font-size: 2rem;
    color: #d1f7ff;
  }

  .radio > label {
    color: #d1f7ff;
  }
`;

const Input = ({
  label,
  // values,
  name,
  type = "text",
  errors,
  placeholder,
  className,
  description,
  isLoading,
  style,
  min,
  max,
  value,
  onChange,
  ...props
}) => (
  <Container>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      id={name}
      min={min}
      max={max}
      value={value}
      name={name}
      onChange={onChange}
      style={style}
      type={type}
      placeholder={placeholder}
    ></Form.Control>
  </Container>
);

const Checkbox = ({
  label,
  value,
  name,
  onChange,
  errors,
  children,
  className,
  custom,
  disabled = "false",
  ...props
}) => (
  <Container>
    <Form.Check
      label={label}
      name={name}
      onChange={onChange}
      value={value}
      // checked={value}
      type="checkbox"
      custom
    ></Form.Check>
  </Container>
);

const Select = ({
  label,
  options,
  name,
  type = "select",
  errors,
  placeholder,
  className,
  description,
  isLoading,
  ...props
}) => (
  <Container>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      style={{ backgroundColor: "#4a9bba", color: "#d1f7ff", border: "none" }}
      as="select"
      custom
    >
      {options.map((each) => (
        <option>{each}</option>
      ))}
    </Form.Control>
  </Container>
);

const Radio = ({
  label,
  value,
  name,
  errors,
  children,
  className,
  custom,
  checked,
  disabled = "false",

  ...props
}) => (
  <Container>
    <Form.Check
      className="radio"
      name={name}
      checked={checked}
      value={value}
      label={label}
      type="radio"
      // custom
    />
  </Container>
);

export { Select, Input, Checkbox, Radio };
