import CardList from "../../components/CardList/CardList.js";
import { useRouter } from "next/router";
import CollectionNavbar from "@/components/CollectionNavBar/CollectionNavBar.js";
import CollectionHeader from "@/components/CollectionHeader/CollectionHeader.js";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner.js";
import FActionButton from "@/components/FaButton/FaButton.js";
import { MdQuiz } from "react-icons/md";
import { GiCardDraw } from "react-icons/gi";
import GlobalStyle from "../../styles.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SearchBar from "@/components/SearchBar/SearchBar.js";
import { useState } from "react";
import {
  StyledContainer,
  StyledLink,
  Wrapper,
} from "@/components/collections[id].styled.js";

export default function CollectionCardList({
  cards,
  getCollection,
  deleteCard,
  resetCard,
  onToggle,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const collection = getCollection(router.query.id);

  if (!collection) {
    return <LoadingSpinner />;
  }

  const isArchivePage = router.query["archive"] === "true";

  const filteredCards = collection
    ? cards
        .filter((card) => card.collection === collection.id)
        .filter((card) => card.isMastered === isArchivePage)
        .filter(
          (card) =>
            card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : [];

  function handleQuizClick() {
    router.push(`/collections/${collection.id}/quiz`);
  }

  async function handleResetClick() {
    const confirmFirst = await new Promise((resolve) => {
      confirmAlert({
        title: "Karten zurücksetzen?",
        message:
          "Möchtest du wirklich alle Karten auf Level 1 zurücksetzen und in deinen aktiven Kartenstapel verschieben?",
        buttons: [
          {
            label: "Ja, bitte.",
            onClick: () => resolve(true),
          },
          {
            label: "Nein, danke.",
            onClick: () => resolve(false),
          },
        ],
      });
    });

    if (confirmFirst) {
      //for each starts an asynchronous call for each card, but does not await the outcomes.
      //This is ok here, because we don'T do anything here afterwards anyways.
      filteredCards &&
        filteredCards.forEach(async (card) => {
          await resetCard(card);
        });
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const headerName = isArchivePage
    ? `${collection.name}-Archiv`
    : collection.name;

  return (
    <>
      <GlobalStyle isArchive={isArchivePage} />
      <StyledContainer>
        <CollectionHeader name={headerName} />
      </StyledContainer>
      {!isArchivePage && !filteredCards.length && searchTerm === "" ? (
        <StyledContainer>
          <p>Dein Kartenstapel ist noch leer.</p>
          <br />
          <p>
            <StyledLink
              aria-label="Hier kannst du Karten hinzufügen"
              href={"/create"}
            >
              Füge neue Karten hinzu!
            </StyledLink>
          </p>
        </StyledContainer>
      ) : (
        <Wrapper>
          <SearchBar handleSearch={handleSearch} />
          <CardList
            cards={filteredCards}
            deleteCard={deleteCard}
            onToggle={onToggle}
            reversedDirection={collection.reversedDirection}
            resetCard={resetCard}
          />
        </Wrapper>
      )}
      {!isArchivePage && (
        <FActionButton aria-label="Quiz starten" onClick={handleQuizClick}>
          <MdQuiz />
        </FActionButton>
      )}

      {isArchivePage && (
        <FActionButton
          aria-label="Karten zurücksetzen"
          onClick={handleResetClick}
        >
          <GiCardDraw />
        </FActionButton>
      )}

      <CollectionNavbar aria-label="Navigationsleiste" id={collection.id} />
    </>
  );
}
