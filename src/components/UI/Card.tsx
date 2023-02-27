import { ReactNode } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: white;
`;

const Card = ({ children }: { children: ReactNode }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Card;
