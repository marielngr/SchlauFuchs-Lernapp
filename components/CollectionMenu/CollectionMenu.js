import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { Menu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { MdDeleteForever, MdEdit, MdOutlineClose } from "react-icons/md";
import { SlDirections } from "react-icons/sl";
import { BsThreeDots } from "react-icons/bs";
import { RxReset } from "react-icons/rx";
import {
  StyledMenuButton,
  IconWrapper,
  StyledMenu,
  StyledMenuItem,
  StyledLabel,
} from "./CollectionMenu.styled";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function CollectionMenu({
  id,
  deleteCollection,
  resetCards,
  toggleCardDirection,
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

  function onEdit() {
    router.push(`/collections/${id}/edit`);
    setIsMenuOpen(false);
  }

  function handleToggleCardDirection() {
    toggleCardDirection(id);
    setIsMenuOpen(false);
  }

  async function handleDelete() {
    const confirmFirst = await new Promise((resolve) => {
      confirmAlert({
        title: "Kartenstapel löschen?",
        message: "Möchtest du den gesamten Stapel wirklich löschen?",
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
      const confirmSecond = await new Promise((resolve) => {
        confirmAlert({
          title: "Endgültig löschen",
          message:
            "Bist du dir ganz sicher? ALLE KARTEN dieses Kartenstapels werden gelöscht!!",
          buttons: [
            {
              label: "Ja, endgültig löschen.",
              onClick: () => resolve(true),
            },
            {
              label: <StyledLabel>NEIN, abbrechen.</StyledLabel>,
              onClick: () => resolve(false),
            },
          ],
        });
      });

      if (confirmSecond) {
        deleteCollection(id);
      }
    }

    setIsMenuOpen(false);
  }

  async function handleReset() {
    const confirmFirst = await new Promise((resolve) => {
      confirmAlert({
        title: "Kartenstapel zurücksetzen?",
        message:
          "Möchtest du alle Karten des Stapels auf Level 1 zurücksetzen?",
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
      resetCards();
    }
    setIsMenuOpen(false);
  }

  return (
    <>
      <Menu
        menuButton={
          <StyledMenuButton
            aria-label="Hier öffnest du das Kartenstapelmenu"
            onClick={handleMenuClick}
          >
            <IconWrapper>
              {isMenuOpen ? <MdOutlineClose /> : <BsThreeDots />}
            </IconWrapper>
          </StyledMenuButton>
        }
        transition
      >
        <StyledMenu ref={menuRef}>
          <StyledMenuItem
            aria-label="Hier kannst du einen Kartenstapel bearbeiten"
            onClick={onEdit}
          >
            <MdEdit /> &nbsp; Kartenstapel bearbeiten
          </StyledMenuItem>
          <StyledMenuItem
            aria-label="Hier kannst du den gesamten Kartenstapel löschen"
            onClick={handleDelete}
          >
            <MdDeleteForever />
            &nbsp; Kartenstapel löschen
          </StyledMenuItem>
          <StyledMenuItem
            aria-label="Hier kannst du den gesamten Kartenstapel zurücksetzen"
            onClick={handleReset}
          >
            <RxReset />
            &nbsp; Kartenstapel zurücksetzen
          </StyledMenuItem>
          <StyledMenuItem
            aria-label="Hier kannst du die Kartenrichtung umschalten"
            onClick={() => handleToggleCardDirection()}
          >
            <SlDirections />
            &nbsp; Umschalten der Kartenrichtung
          </StyledMenuItem>
        </StyledMenu>
      </Menu>
    </>
  );
}
