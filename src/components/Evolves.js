import React from "react";
import { useState } from "react";
import { Button } from "@salutejs/plasma-ui";
import { Link, Navigate } from "react-router-dom";

export class Evolves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
    };
  }

  render() {
    const { onEvolve } = this.props;
    const { onChangeEv } = this.props;
    

    console.log("alloevolve", this.props.onChangeEv.notes[0].title);
    if (this.props.onChangeEv.notes[0].title != "no") {
      return (
      <Navigate to="/Unit" />
      );
    }

    return (
      <div>
        <h1 className="heading">Выбери свой уровень</h1>
      <p>   </p>
        <div className="btn-group">
          {[1, 2, 3, 4, 5, 6].map((num) => (
              <Button
                key={num}
                onClick={() => this.props.onEvolve(num)}
              >
                {num}
              </Button>
          ))}
        </div>
<div class="background">
    <div class="transparent">Прозрачный текст</div>
 <div class="transparent">Прозрачный текст</div>
</div>
      </div>
    );
  }
}
export default Evolves;
