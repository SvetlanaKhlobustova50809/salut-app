import React from "react";
import {Button} from "@salutejs/plasma-ui";
import {useNavigate} from "react-router-dom";


function Resultlear() {
  // function handleClick() {
  //   window.location.href = '/';
  // }
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="heading">Поздравляем, изучение пройдено!</h1>
      <div className="btn-group1">
        {/*<Button onClick={() => handleClick()}>К началу</Button>*/}
        <Button
          onClick={() => navigate(`/`)}
        >
          К началу
        </Button>
      </div>
    </div>
  );
}

export default Resultlear;
