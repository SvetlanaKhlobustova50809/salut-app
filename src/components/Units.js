import React from "react";
import { Button } from "@salutejs/plasma-ui";
import { Navigate } from "react-router-dom";

function handleClick() {
  window.location.href = "/";
}

export class Units extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
    };
  }

  render() {
    if (
      this.props.onChangeUn.notes[1].title !== "no" &&
      this.props.onChangeUn.notes[0].title !== Object
    ) {
      console.log(this.props.onChangeUn.notes[1].title);
      return <Navigate to="/learning" />;
    }
    return (
      <div>
        <h1 className="heading">Выбери свой раздел</h1>
        <div className="btn-group1">
          <Button onClick={() => handleClick()}>Назад</Button>
        </div>
        <div className="btn-group">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
            <Button key={num} onClick={() => this.props.onUnit(num)}>
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
export default Units;
