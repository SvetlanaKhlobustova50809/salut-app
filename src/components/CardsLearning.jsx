import React, {useEffect, useState} from "react";
import {Button} from "@salutejs/plasma-ui";
import {useNavigate, useParams} from "react-router-dom";
import ReactCardFlip from "react-card-flip";

let data = require("./data.json");
let num_evolve = 1;
let num_unit = 1;

// console.log(data);

function get_data(evolve, unit) {
  console.log(`get_data: evolve: ${evolve} unit: ${unit}`);
  const result = data[evolve][unit];
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
  const {evolve, unit, step: strStep} = useParams();
  const navigate = useNavigate();

  const evolve_key = "evolve_" + String(evolve);
  const num_evolve = evolve;
  const unit_key = "unit_" + String(unit);
  const num_unit = unit;

  const step = parseInt(strStep);
  const repetitions = get_data(evolve_key, unit_key);
  const len = repetitions.length;
  const word = repetitions[step].title

  const [flip, setFlip] = useState(false);

  useEffect(() => {
    console.log("Unit: useEffect");
    props.onOpen({ evolve, unit, step, word });
    return () => {
    };
  }, []);

  const isLastWord = step >= len - 1;
  const isFirstWord = step <= 0;

  const Header = () => (
    <>
      <div className="btn-group1">
        <Button
          onClick={() => navigate(-1)}
        >
          Назад
        </Button>
      </div>
      <br/>
      <div className="heading">
        <span>Уровень: {num_evolve} </span>
        <span>Раздел: {num_unit} </span>
      </div>
    </>
  )

  const TranslateButton = () => <Button
    onClick={() => setFlip(!flip)}
  >
    Перевернуть карточку
  </Button>

  const FlipBackButton = () => <Button
    onClick={() => setFlip(!flip)
    }>
    Перевернуть карточку
  </Button>

  const NextButton = () => <Button
    // onClick={() => handleButtonClick(flip, step + 1)}
    onClick={() => navigate(`/evolve/${evolve}/unit/${unit}/step/${step + 1}`)}
  >
    Следующее слово
  </Button>

  const PrevButton = () => <Button
    // onClick={() => handleButtonClick(flip, step - 1)}
    onClick={() => navigate(`/evolve/${evolve}/unit/${unit}/step/${step - 1}`)}
  >
    Предыдущее слово
  </Button>

  const ResultButton = () => <Button
    onClick={() => navigate(`/resultlear`)}
  >
    Результат
  </Button>

  const Group1 = () => (
    // <div className={`cardsOff ${showNextCard ? "hide" : ""}`}>
    <div className={`cardsOff`}>
      {word}
      <br/>
      <br/>
      <TranslateButton/>
      <br/>
      {isLastWord ? <ResultButton/> : <NextButton/>}
      <br/>
      {isFirstWord ? <></> : <PrevButton/>}
    </div>
  )


  const Group2 = () => (
    // <div className={`cardsOn ${showNextCard ? "show" : ""}`}>
    <div className={`cardsOn`}>
      {repetitions[step].correct}
      <br/>
      <br/>
      <FlipBackButton/>
      <br/>
      {isLastWord ? <ResultButton/> : <NextButton/>}
      <br/>
      {isFirstWord ? <></> : <PrevButton/>}
    </div>
  )

  return (
    <div>
      <Header/>

      <div className="btn-group2">
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">

          <Group1/>

          <Group2/>

        </ReactCardFlip>
      </div>
    </div>
  );
}

export default CardsLearning;
