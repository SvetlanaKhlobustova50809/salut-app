import React, {useEffect, useState} from "react";
import {Button} from "@salutejs/plasma-ui";
import {useParams} from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { useNavigate } from "react-router-dom";
let data = require("./data.json");

// console.log(data);

export function get_data(evolve, unit) {
  const evolve_key = "evolve_" + evolve;
  const unit_key = "unit_" + unit;
  // console.log(`get_data: evolve: ${evolve_key} unit: ${unit_key}`);
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
  const {evolve, unit, step: strStep, flip} = useParams();
  const {onOpen, onBack, onNext, onPrev, onFlip, onResult} = props;

  const step = parseInt(strStep);
  const repetitions = get_data(evolve, unit);
  const len = repetitions.length;
  const word = repetitions[step].title

  // const [flip, setFlip] = useState(false);

  useEffect(() => {
    // console.log("CardsLearning:: useEffect", {evolve, unit, step, word});
    onOpen({evolve, unit, step, flip, word});
    return () => {
    };
  }, [evolve, unit, step, flip, word]);

  const isLastWord = step >= len - 1;
  const isFirstWord = step <= 0;

  const Header = () => (
    <>
      <div className="btn-group1">
        <Button
          onClick={() => onBack({evolve, unit, step, flip, word})}
        >
          Назад
        </Button>
      </div>
      <br/>
      <div className="heading">
        <span>Уровень: {evolve} </span>
        <span>Раздел: {unit} </span>
      </div>
      <div className="step-cards">{step + 1}/{len}</div>
    </>
  )

  const TranslateButton = () => <Button
    // onClick={() => setFlip(!flip)}
    onClick={() => onFlip({evolve, unit, step, flip, word})}
  >
    Перевернуть карточку
  </Button>

  const FlipBackButton = () => <Button
    // onClick={() => setFlip(!flip)}
    onClick={() => onFlip({evolve, unit, step, flip, word})}
  >
    Перевернуть карточку
  </Button>

  const NextButton = () => {
    // console.log("CardsLearning: NextButton render", {evolve, unit, step, word});

    return <Button
      onClick={() => {

        // console.log("CardsLearning: NextButton onClick", {evolve, unit, step, word});

        onNext({evolve, unit, step, flip, word})
      }
      }
    >
      Следующее слово
    </Button>
  }

  const PrevButton = () => <Button
    onClick={() => onPrev({evolve, unit, step, flip, word})}
  >
    Предыдущее слово
  </Button>

  const ResultButton = () => <Button
    onClick={() => onResult({evolve, unit, step, flip, word})}
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
      <FlipBackButton/>
      <br/>
    </div>
  )

  // console.log("CardsLearning: render", {evolve, unit, step, word});

  return (
    <div>
      <Header/>

      <div className="btn-group2">
        <ReactCardFlip isFlipped={flip!=0} flipDirection="vertical">

          <Group1/>

          <Group2/>

        </ReactCardFlip>
      </div>
    </div>
  );
}

export default CardsLearning;
