import CollectionContainer from "../CollectionContainer/CollectionContainer";

export default function CollectionList({
  collections,
  cards,
  deleteCollection,
}) {
  return (
    <>
      {collections &&
        collections.map((collection) => {
          const filteredCards = cards.filter(
            (card) => card.collection === collection.id
          );
          return (
            <div key={collection.id}>
              <CollectionContainer
                name={collection.name}
                id={collection.id}
                deleteCollection={deleteCollection}
                cards={filteredCards}
              />
            </div>
          );
        })}
    </>
  );
}
