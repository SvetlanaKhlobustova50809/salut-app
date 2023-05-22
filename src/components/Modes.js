import React from "react";
import { useState } from "react";
import { Button } from "@salutejs/plasma-ui";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';


export class Modes extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      note: '',
    }
  }
 

  render () {
    const { onChangeMode } = this.props;
    console.log(this.props.onChangeMode);
    if (
      this.props.onChangeMode.notes.length > 2 &&
      this.props.onChangeMode.notes[2].title != "no" &&
      this.props.onChangeMode.notes[2].title != Object
    ) {
      return <Navigate to="/learning" />;
    }
    return (
      <div>
        <h1 className="heading">Нажми start</h1>
        <Button data-hint="Чтобы начать изучать слова нужно сказать команду 'Запусти английский в мисис' и выбрать evolve, unit и нажать start.">
          Помощь
        </Button>
        <div className="btn-group">
          <div className="divModes">
            <Link to="/learning">
              <Button onClick={() => this.props.onModes("learning")}>
                Старт
              </Button>
            </Link>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}
export default Modes;
