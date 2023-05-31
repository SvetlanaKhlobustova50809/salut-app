import React from "react";
import { useState } from "react";
import { Button, h1 } from "@salutejs/plasma-ui";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { Navigate } from "react-router-dom";
import { fonts } from "@salutejs/plasma-tokens";

let data = require("./data.json");
let num_evolve = 1;
let num_unit = 1;
console.log(data);
function get_data(evolve, unit) {
  const result = data[evolve][unit];
  let json_data = [];
  for (let i = 0; i < result.length; i += 2) {
    var newDict = {
      title: result[i],
      correct: result[i + 1],
    };
    json_data.push(newDict);
  }
  return json_data;
}

function handleClick() {
  window.location.href = "/unit";
}

function CardsLearning(props) {
  let evolve = "evolve_1";
  let unit = "unit_1";
  console.log("cardslearning", props.onLearn);

  if (
    props.onLearn.notes[0].title != "no" &&
    props.onLearn.notes[0].title != Object
  ) {
    evolve = "evolve_" + String(props.onLearn.notes[0].title);
    num_evolve = props.onLearn.notes[0].title;
  }
  if (
    props.onLearn.notes[1].title != "no" &&
    props.onLearn.notes[1].title != Object
  ) {
    unit = "unit_" + String(props.onLearn.notes[1].title);
    num_unit = props.onLearn.notes[1].title;
  }

  const repetitions = get_data(evolve, unit);
  const [step, setStep] = useState(0);
  const repetition = repetitions[step];
  const len = repetitions.length;

  const [flip, setFlip] = useState(false);
  // const handleButtonClick = (flip, step) => {
  //   setFlip(flip);
  //   setStep(step);
  // };

  const [showNextCard, setShowNextCard] = useState(false);
  const handleButtonClick = (flip, step) => {
    setFlip(flip);
    setShowNextCard(false);
    setTimeout(() => {
      setStep(step);
      setShowNextCard(true);
    }, 200);
  };

  if (
    props.onLearn.notes.length > 3 &&
    props.onLearn.notes[3].title != "no" &&
    props.onLearn.notes[3].title != Object
  ) {
    return <Navigate to="/Evolve" />;
  }

  return (
    <div>
      <div className="btn-group1">
        <Button onClick={() => handleClick()}>Назад</Button>
      </div>
      <br />
      <div class="heading">
        <span>Уровень: {num_evolve} </span>
        <span>Раздел: {num_unit} </span>
      </div>
      <div className="btn-group2">
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
        <div className={`cardsOff ${showNextCard ? "hide" : ""}`}>
            {repetitions[step].title}
            <br />
            <br />
            <Button onClick={() => setFlip(!flip)}>Узнать перевод</Button>
            <br />
            {step == len - 1 ? (
              <Link to="/resultlear">
                <Button>Результат</Button>
              </Link>
            ) : (
              <>
                <Button onClick={() => handleButtonClick(flip, step + 1)}>
                  Следующее слово
                </Button>
              </>
            )}
            <br />
            {step > 0 ? (
              <>
                <Button onClick={() => handleButtonClick(flip, step - 1)}>
                  Предыдущее слово
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className={`cardsOn ${showNextCard ? "show" : ""}`}>
            {repetitions[step].correct}
            <br />
            <br />
            <Button onClick={() => setFlip(!flip)}>Перевернуть</Button>
            <br />
            {step == len - 1 ? (
              <Link to="/resultlear">
                <Button>Результат</Button>
              </Link>
            ) : (
              <>
                <Button onClick={() => handleButtonClick(!flip, step + 1)}>
                  Следующее слово
                </Button>
              </>
            )}
            <br />
            {step > 0 ? (
              <>
                <Button onClick={() => handleButtonClick(!flip, step - 1)}>
                  Предыдущее слово
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default CardsLearning;
