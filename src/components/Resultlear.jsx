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
        <Button data-hint="Чтобы начать изучать слова нужно сказать команду 'Запусти английский в мисис' и выбрать уровень и раздел.">
          Помощь
        </Button>
        <div className="btn-group">
          <div className="divModes">
            <Button onClick={handleClick}>Выход</Button>
          </div>
        </div>
      </div>
    );
}

export default Resultlear;
