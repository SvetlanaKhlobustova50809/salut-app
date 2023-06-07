import React from "react";
import {Button} from "@salutejs/plasma-ui";


function Resultlear(props) {
  const {onRestart} = props;
  return (
    <div>
      <h1 className="heading">Поздравляем, изучение пройдено!</h1>
      <div className="btn-group1">
        {/*<Button onClick={() => handleClick()}>К началу</Button>*/}
        <Button
          onClick={() => onRestart()}
        >
          К началу
        </Button>
      </div>
    </div>
  );
}

export default Resultlear;
