import React, {useEffect} from "react";
import {Button} from "@salutejs/plasma-ui";
// import { Button } from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";

let evolve = 1;

// function handleClickBack() {
//   window.location.href = "/";
// }

function Units(props) {

  const {evolve} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Unit: useEffect");
    props.onOpen({ evolve });
    return () => {};
  }, []);

  return (
    <div>
      <h1 className="heading">Выбери свой раздел</h1>

      <div className="btn-group1">
        <Button
          // onClick={() => handleClickBack()}
          onClick={() => navigate(-1)}
        >Назад</Button>
      </div>

      <br/>

      <div className="heading">
        <span>Уровень: {evolve} </span>
      </div>

      <div className="btn-group">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((unit) => (
          <Button
            onClick={() => navigate(`/evolve/${evolve}/unit/${unit}/step/0`)}
            key={unit}
          >
            {unit}
          </Button>
          // <Button key={unit} onClick={() => props.onUnit(unit)}>
          //   {unit}
          // </Button>
        ))}
      </div>
      <div className="background">
        <div className="transparent">Прозрачный текст</div>
        <div className="transparent">Прозрачный текст</div>
      </div>
    </div>
  );
  // }
}

export default Units;
