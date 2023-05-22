import React from "react";
import { useState } from "react";
import { Button } from "@salutejs/plasma-ui";
import { Link } from "react-router-dom";

function Resultper() {
  return (
    <div className="outer-div inner-div btn-group">
      <h1>Ты прошел изучение</h1>
      <Link to="/">
        <Button>Выход</Button>
      </Link>
    </div>
  );
}

export default Resultper;
