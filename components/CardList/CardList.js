import ButtonNavBar from "../ButtonNavBar/ButtonNavBar";
import CardContainer from "../CardContainer/CardContainer";

export default function CardList({ cards }) {
  //macht es Sinn Zeile 9ff. in Ternary zu verschachteln etwa so !cards? null : cards.map....

  return (
    <>
      {cards.map((newCard) => (
        <div key={newCard.id}>
          <CardContainer question={newCard.question} answer={newCard.answer} />
          <ButtonNavBar id={newCard.id} />
        </div>
      ))}
    </>
  );
}
