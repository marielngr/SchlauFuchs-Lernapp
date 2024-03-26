import {
  StyledCollectionContainer,
  StyledColorContainer,
  StyledTextContainer,
  CollectionLink,
  StyledCollectionName,
  StyledWrapper,
  StyledCounter,
} from "./CollectionContainer.styled";

import CollectionMenu from "../CollectionMenu/CollectionMenu";

export default function CollectionContainer({
  name,
  id,
  color,
  cards,
  deleteCollection,
}) {
  return (
    <StyledCollectionContainer>
      <StyledColorContainer $color={color} />
      <StyledTextContainer noCards={!cards}>
        {cards && (
          <CollectionMenu deleteCollection={deleteCollection} id={id} />
        )}
        <CollectionLink href={`/collections/${id}`}>
          <StyledWrapper>
            <StyledCollectionName>{name}</StyledCollectionName>

            {cards && <StyledCounter>{cards.length}</StyledCounter>}
          </StyledWrapper>
        </CollectionLink>
      </StyledTextContainer>
    </StyledCollectionContainer>
  );
}
