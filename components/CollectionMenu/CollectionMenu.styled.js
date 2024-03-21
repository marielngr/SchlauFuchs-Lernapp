import styled from "styled-components";
import { MenuButton, MenuItem } from "@szhsin/react-menu";

export const StyledMenuButton = styled(MenuButton)`
  border: none;
  background-color: transparent;



  margin-left: 75%;

`;

export const IconWrapper = styled.div`
  font-size: 2.3rem;
  color: var(--color-font-3);
  opacity: 0.9;

`;

export const StyledMenu = styled.div`
  padding: 1.5rem;
  margin-right: 3rem;
`;

export const StyledMenuItem = styled(MenuItem)`
  padding: 1rem 1rem 1rem 0.5rem;
  font-size: 1.1rem;
`;


export const StyledTitle = styled.p`
  color: #bd1212;
`;

export const StyledLabel = styled.label`
  font-size: 1rem;
`;

