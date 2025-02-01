import { useState } from "react";
import "./style.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dices, setDices] = useState(() => getDices());

  const diceComponents = dices.map((el) => (
    <Die
      id={el.id}
      key={el.id}
      isHeld={el.isHeld}
      value={el.value}
      colorDice={colorDice}
    />
  ));

  function getDices() {
    const arrayDices = [];
    for (let i = 0; i < 10; i++) {
      const randomNr = Math.ceil(Math.random() * 6);
      const diceObj = {
        isHeld: false,
        value: randomNr,
        id: nanoid(),
      };
      arrayDices.push(diceObj);
    }
    return arrayDices;
  }

  function colorDice(id) {
    setDices((prevValue) =>
      prevValue.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  } //returnam un array care are casuta apasata actualizata (schimba proprietatea held)

  function mixDices() {
    if (!gameWon) {
      setDices((prevvalue) =>
        prevvalue.map((dice) =>
          dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) }
        )
      ); //returnam un array in care casutelor cu proprietatea isHeld false(adica nu au fost apasate), li se vor schimba proprietatea value
    } else {
      setDices(getDices());
    }
  }

  let gameWon =
    dices.every((dice) => dice.isHeld) &&
    dices.every((dice) => dice.value === dices[1].value);

  return (
    <main>
      <h1 className="title rubik-bubbles-regular">Tenzies</h1>

      {gameWon && <Confetti width="1500vh" />}
      <div className="containerDices">{diceComponents}</div>
      <button className="roll" onClick={mixDices}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
