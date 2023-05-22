import React from 'react';
import { useState } from 'react';
import {Button} from '@salutejs/plasma-ui';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export class Units extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      note: '',
    }
  }
 

  render () {
    const { onUnit } = this.props;
    const { onChangeUn } = this.props;
    
    if (this.props.onChangeUn.notes[1].title != "no" && this.props.onChangeUn.notes[0].title != Object) {
      console.log(this.props.onChangeUn.notes[1].title);
      return <Navigate to="/Modes"/>;
    }
    return (
      <div>
        <h1 className="heading">Выбери свой Unit</h1>
        <Button data-hint="Чтобы начать изучать слова нужно сказать команду 'Запусти английский в мисис' и выбрать evolve, unit и нажать start.">
          Помощь
        </Button>
        <div className="btn-group2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <Link to="/Modes">
              <Button
                key={num}
                onClick={() => this.props.onUnit(num )} 
              >
                {num}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
export default Units;
