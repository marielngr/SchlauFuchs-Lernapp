import styled from "styled-components";
import Link from "next/link";

export const StyledCollectionContainer = styled.div`
  display: flex;
  border: 2px solid darkgray;
  border-radius: 20px;
  min-width: 75%;
  max-width: 75%;
  flex: 1;
`;

export const StyledColorContainer = styled.div`
  border-radius: 15px 0px 0px 15px;
  background-color: orange;
  width: 25%;
`;

export const StyledTextContainer = styled.div`
  text-align: center;
  flex: 1;
  font-size: 1rem;
`;

export const CollectionLink = styled(Link)`
  text-decoration: none;

  color: black;
  transition: color 0.3s;
  cursor: pointer;
  &:hover {
    color: orangered;
  }
`;

export const StyledCollectionName = styled.h3`
  margin-top: 0;
  margin-bottom: 2.2rem;
  overflow-wrap: break-word;
  max-width: 45%;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const StyledCounter = styled.p`
  margin-top: 0;
  margin-bottom: 2.2rem;
  min-width: 10%;
`;
