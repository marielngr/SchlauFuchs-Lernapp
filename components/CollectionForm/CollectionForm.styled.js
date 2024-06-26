import styled from "styled-components";
import { calculateFontSize } from "../../utils";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

export const StyledLabel = styled.label`
  margin: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 1.3rem;
`;

export const StyledButton = styled.button`
  margin: 0.2rem 1.5rem;
  padding: 0 1rem;
  height: 4.5rem;
  width: 4.5rem;

  border-radius: 50%;
  border: none;

  background-color: var(--color-background-1);
  color: var(--color-font-3);
`;

export const StyledInput = styled.textarea`
  margin: 0.2rem 0.7rem;
  padding: 3rem;
  height: 13rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 2px 2px 10px 2px var(--color-background-1);
  background-color: var(--color-background-3);
  text-align: center;
  font-family: system-ui;
  opacity: 0.7;
  resize: none;
  outline: none;
  max-width: 80vw;
  font-size: ${({ textLength }) => `${calculateFontSize(textLength)}px`};
  color: var(--color-font-1);
`;
export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.1rem;
`;
