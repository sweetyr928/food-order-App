import { useRef, useState } from "react";
import styled from "styled-components";
import Input from "../../UI/Input";

const StyledForm = styled.form`
  text-align: right;

  button {
    font: inherit;
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: white;
    padding: 0.25rem 2rem;
    border-radius: 20px;
    font-weight: bold;
  }

  button:hover,
  button:active {
    background-color: #641e03;
    border-color: #641e03;
  }
`;

const MealItemForm = ({
  id,
  onAddToCart,
}: {
  id: string;
  onAddToCart: (amount: number) => void;
}) => {
  const [amountIsValid, setAmountIsValid] = useState<boolean>(true);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // enteredAmount 타입을 number로 변경
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    onAddToCart(enteredAmountNumber);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </StyledForm>
  );
};

export default MealItemForm;
