import React, { useEffect, useState } from "react";
import { Button } from "@salutejs/plasma-ui";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import ReactCardFlip from "react-card-flip";

let data = require("./data.json");

export function get_data(evolve, unit) {
  const evolve_key = "evolve_" + evolve;
  const unit_key = "unit_" + unit;
  const result = data[evolve_key][unit_key];
  let json_data = [];
  for (let i = 0; i < result.length; i += 2) {
    const newDict = {
      title: result[i],
      correct: result[i + 1],
    };
    json_data.push(newDict);
  }
  return json_data;
}

function CardsLearning(props) {
  const { evolve, unit } = useParams();
  const { onOpen } = props;

  const repetitions = get_data(evolve, unit);
  const len = repetitions.length;

  useEffect(() => {
    onOpen({ evolve, unit});
    return () => {};
  }, [evolve, unit]);

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/evolve/${evolve}/unit`);
  }

  const [step, setStep] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showNextCard, setShowNextCard] = useState(false);

  const handleButtonClick = (flip, step) => {
    setFlip(flip);
    setShowNextCard(false);
    setTimeout(() => {
      setStep(step);
      setShowNextCard(true);
    }, 200);
  };

  return (
    <div>
      <div className="btn-group1">
        <Button onClick={() => handleClick()}>Назад</Button>
      </div>
      <br />
      <div class="heading">
        <span>Уровень: {evolve} </span>
        <span>Раздел: {unit} </span>
      </div>
      <div className="step-cards">{step + 1}/{len}</div>
      <div className="btn-group2">
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
          <div className={`cardsOff ${showNextCard ? "hide" : ""}`}>
            {repetitions[step].title}
            <br />
            <br />
            <Button onClick={() => setFlip(!flip)}>Узнать перевод</Button>
            <br />
            {step == len - 1 ? (
                <Button onClick={() => navigate(`/resultlear`)}>Результат</Button>
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
                <Button onClick={() => navigate(`/resultlear`)}>Результат</Button>
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
