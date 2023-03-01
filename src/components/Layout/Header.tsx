import styled from "styled-components";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 5rem;
  background-color: #8a2b06;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;

  h1 {
    margin: 0px 0px 0px 100px;
  }

  button {
    margin: 0px 100px 0px 0px;
  }
`;

const StyledImage = styled.div`
  width: 100%;
  height: 25rem;
  z-index: 0;
  overflow: hidden;

  img {
    width: 110%;
    height: 100%;
    object-fit: cover;
    transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
  }
`;

// TODO: onShowCart type 변경
const Header = ({ onShowCart }: { onShowCart: () => void }) => {
  return (
    <>
      <StyledHeader>
        <h1>My food order App</h1>
        <HeaderCartButton onClick={onShowCart} />
      </StyledHeader>
      <StyledImage>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </StyledImage>
    </>
  );
};

export default Header;
