import Link from "next/link";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-fox);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const StyledNavButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: var(--color-font-3);
  font-size: 2.3rem;
  margin: 15px;
  visibility: ${(props) => (props.$hidden ? "hidden" : "visible")};
`;

export const StyledQuizButtonRight = styled.button`
  border: none;
  color: #ffa7a1;
  /* color: #f07067; */
  background-color: rgba(0, 0, 0, 0);
  font-size: 3rem;
  padding: 5px;
`;

export const StyledQuizButtonWrong = styled.button`
  border: none;
  color: #69bf8d;
  background-color: rgba(0, 0, 0, 0);
  font-size: 3rem;
  padding: 5px;
`;

export const StyledButtonNavBar = styled.div`
  width: auto;
  display: flex;
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  gap: 2rem;
  justify-content: center;
`;
export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
