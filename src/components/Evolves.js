import React from "react";
import { useState } from "react";
import { Button } from "@salutejs/plasma-ui";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
      return <Navigate to="/Unit" />;
    }

    return (
      <div>
        <h1 className="heading">Выбери свой Evolve</h1>

        <div className="btn-group">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <Link to="/Unit">
              <Button key={num} onClick={() => this.props.onEvolve(num)}>
                {num}
              </Button>
            </Link>
          ))}
        </div>
<h1 className="heading"> </h1>
<h1 className="heading"> </h1>
<h1 className="heading"> </h1>
<h1 className="heading"> </h1>
      </div>
    );
  }
}
export default Evolves;
