import React from "react";
import { useState } from "react";
import { Button } from "@salutejs/plasma-ui";
import { Link } from "react-router-dom";



function Resultlear()  {
  function handleClick() {
    window.location.href = '/';
  }

    return (
      <div>
        <h1 className="heading">Поздравляем, изучение пройдено!</h1>
        <div className="divModes">
          <Button onClick={() => handleClick()}>Назад</Button>
        </div>
      </div>
    );
}

export default Resultlear;
