import styled from "styled-components";
import React from "react";

const StyledInputWrapper = styled.input`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  label {
    font-weight: bold;
    margin-right: 1rem;
  }

  input {
    width: 3rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font: inherit;
    padding-left: 0.5rem;
  }
`;

interface InputProps {
  id: string;
  type: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
}

interface IProps {
  label: string;
  input: InputProps;
}

const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ label, input }, ref) => {
    return (
      <StyledInputWrapper>
        <label htmlFor={input.id}>{label}</label>
        <input ref={ref} {...input} />
      </StyledInputWrapper>
    );
  }
);

Input.displayName = "Input";

export default Input;
