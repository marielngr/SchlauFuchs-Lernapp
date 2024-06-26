import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { MdDeleteForever, MdEdit, MdOutlineClose } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { RxReset } from "react-icons/rx";
import {
  StyledMenuButton,
  IconWrapper,
  StyledMenu,
  StyledMenuItem,
} from "./CardMenu.styled";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function CardMenu({
  id,
  deleteCard,
  handleResetCard,
  isMastered,
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleMenuClick(event) {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }

  function handleResetCards() {
    handleResetCard(id);
    setIsMenuOpen(false);
  }

  function onEdit() {
    router.push(`/cards/${id}/edit?ismastered=${isMastered}`);
    setIsMenuOpen(false);
  }

  function handleDelete(event) {
    confirmAlert({
      title: "Karte löschen?",
      message: "Möchtest du diese Karte wirklich löschen?",
      buttons: [
        {
          label: "Ja, bitte.",
          onClick: () => {
            deleteCard(id);
          },
        },
        {
          label: "Nein, danke.",
        },
      ],
    });
    setIsMenuOpen(false);
  }

  return (
    <Menu
      menuButton={
        <StyledMenuButton
          aria-label="Hier kannst du das Kartenmenu öffnen und schließen"
          onClick={handleMenuClick}
        >
          <IconWrapper>
            {isMenuOpen ? <MdOutlineClose /> : <BsThreeDots />}
          </IconWrapper>
        </StyledMenuButton>
      }
      transition
      onClick={(event) => event.stopPropagation()}
    >
      <StyledMenu ref={menuRef} onClick={(event) => event.stopPropagation()}>
        <StyledMenuItem
          aria-label="Hier kannst du eine Karte bearbeiten"
          onClick={onEdit}
        >
          <MdEdit /> &nbsp; Karte bearbeiten
        </StyledMenuItem>
        <StyledMenuItem
          aria-label="Hier kannst du die Karte löschen"
          onClick={handleDelete}
        >
          <MdDeleteForever />
          &nbsp; Karte löschen
        </StyledMenuItem>
        <StyledMenuItem
          aria-label="Hier kannst du das Kartenlevel zurücksetzen"
          onClick={handleResetCards}
        >
          <RxReset />
          &nbsp; Kartenlevel zurücksetzen
        </StyledMenuItem>
      </StyledMenu>
    </Menu>
  );
}
