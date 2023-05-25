import React from 'react';
import { useState } from 'react';
import {Button} from '@salutejs/plasma-ui';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function handleClick() {
  window.location.href = '/';
}

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
      return <Navigate to="/learning"/>;
    }
    return (
      <div>
        <h1 className="heading">Выбери свой раздел</h1>
                    <div className="divModes">
          <Button onClick={() => handleClick()}>Назад</Button>
        </div>
        <div className="btn-group2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <Link to="/learning">
              <Button
                key={num}
                onClick={() => this.props.onUnit(num )} 
              >
                {num}
              </Button>
            </Link>
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
export default Units;
