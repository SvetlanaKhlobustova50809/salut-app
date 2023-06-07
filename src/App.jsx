import React from "react";

import {createAssistant, createSmartappDebugger} from "@salutejs/client";
import Evolves from "./components/Evolves";
import Units from "./components/Units";
import CardsLearning, {get_data} from "./components/CardsLearning";
import Resultlear from "./components/Resultlear";
import {Navigate, Route, Routes,} from "react-router-dom";

import "./App.css";


function getWordCount({evolve, unit}) {
  const repetitions = get_data(evolve, unit);
  return repetitions.length;
}

const initializeAssistant = (getState /*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }
  return createAssistant({getState});
};

export class App extends React.Component {

  constructor(props) {
    super(props);
    console.log("App: constructor");
    this.firstRender = true;
    this.assistantReady = false;

    this.state = {
      // notes: [{title: "no"}, {title: "no"}, {title: "no"}],
      // evolve: undefined,
      // unit: undefined,
      // assistantReady: false,
      // firstRender: true,
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    this.assistant.on("data", (event /*: any*/) => {
      // console.log(`assistant.on(data)`, event);
      const {action} = event;
      this.dispatchAssistantAction(action);
    });
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
      this.assistantReady = true;
      this.as_started();
    });
  }

  // componentDidMount() {
  //   console.log("componentDidMount");
  // }

  getStateForAssistant() {
    // console.log("getStateForAssistant: this.state:", this.state);
    const state = {
      item_selector: {
        items: []
        // items: this.state.notes.map(({id, title}, index) => ({
        //   number: index + 1,
        //   id,
        //   title,
        // })),
      },
    };
    // console.log("getStateForAssistant: state:", state);
    return state;
  }


  dispatchAssistantAction(action) {
    // console.log("dispatchAssistantAction", action);
    if (action) {
      console.log("dispatchAssistantAction", action);

      switch (action.type) {

        case "evolve_choose":
          return this.as_evolve_choose(action);

        case "unit_choose":
          return this.as_unit_choose(action);

        case "back":
          return this.as_back(action);

        // case "learn_translate":
        //   return this.learn_translate(action);

        case "learn_flip":
          return this.as_learn_flip(action);

        case "learn_next":
          return this.as_learn_next(action);

        case "learn_prev":
          return this.as_learn_prev(action);

        case "end":
          return this.as_end(action);

        default:
          throw new Error();
      }
    }
  }

  _send_action(action_id, value) {
    console.log(`_send_action "${action_id}", value:`, value);
    if (!this.assistantReady) {
      console.warn(`_send_action: assistant not ready, action_id: "${action_id}"`)
      return
    }
    const data = {
      action: {
        action_id: action_id,
        parameters: value
        // parameters: {
        //   // значение поля parameters может любым, но должно соответствовать серверной логике
        //   value: value, // см.файл src/sc/noteDon;e.sc смартаппа в Studio Code
        // },
      },
    };
    const unsubscribe = this.assistant.sendData(data, (data) => {
      // функция, вызываемая, если на sendData() был отправлен ответ
      const {type, payload} = data;
      console.log("sendData onData:", type, payload);
      unsubscribe();
    });
  }

  //

  as_started() {
    this._send_action("evolve_start_1", {});
  }

  as_back(action) {
    console.log("as_back");
    this.props.navigate(-1)
  }

  ui_back({evolve}) {
    console.log("ui_back");
    this.props.navigate(-1)
  }

  //

  ui_evolve_loaded() {
    console.log("ui_evolve_loaded");
    this._send_action("evolve_start_2", {});
  }

  as_evolve_choose(action) {
    console.log("as_evolve_choose", action);
    const evolve = action.params.evolve || 1;
    this._evolve_choose({evolve});
  }

  ui_evolve_choose({evolve}) {
    console.log("ui_evolve_choose", {evolve});
    this._evolve_choose({evolve});
  }

  _evolve_choose({evolve}) {
    console.log("_evolve_choose", {evolve});
    this.props.navigate(`/evolve/${evolve}/unit`);
  }

  //

  ui_unit_loaded({evolve}) {
    console.log("ui_unit_loaded");
    this._send_action("unit_start_2", {evolve});
  }

  as_unit_choose(action) {
    console.log("as_unit_choose: action:", action);
    this._unit_choose(action.params)
  }

  ui_unit_choose(params) {
    console.log("ui_unit_choose:", params);
    this._unit_choose(params)
  }

  _unit_choose(params) {
    const {evolve, unit} = params;
    console.log("_unit_choose:", params);
    this.props.navigate(`/evolve/${evolve}/unit/${unit}/step/0/flip/0`);
  }

  //

  ui_learn_loaded(params) {
    console.log("ui_learn_loaded", params);
    this._send_action("learn_start_2", params);
  }

  ui_learn_next(params) {
    console.log("ui_learn_next", params);
    this._learn_next(params);
  }

  as_learn_next(action) {
    console.log("as_learn_next", action);
    this._learn_next(action.params);
  }

  _learn_next(params) {
    console.log("_learn_next", params);
    const {evolve, unit, step, flip, word} = params;
    let s = parseInt(step);
    if (s < getWordCount({evolve, unit}) - 1) {
      s += 1;
    } else {
      console.warn('_learn_next: at the end.');
    }
    this.props.navigate(`/evolve/${evolve}/unit/${unit}/step/${s}/flip/0`);
  }

  as_learn_prev(action) {
    console.log("as_learn_prev", action);
    this._learn_prev(action.params)
  }

  ui_learn_prev(params) {
    console.log("ui_learn_prev", params);
    this._learn_prev(params)
  }

  _learn_prev(params) {
    console.log("_learn_prev", params);
    const {evolve, unit, step, flip, word} = params;
    let s = parseInt(step);
    if (s > 0) {
      s -= 1;
    } else {
      console.warn('_learn_prev: at the start.')
    }
    this.props.navigate(`/evolve/${evolve}/unit/${unit}/step/${s}/flip/0`);
  }


  as_learn_flip(action) {
    console.log("as_learn_flip", action);
    this._learn_flip(action.params);
  }

  ui_learn_flip(params) {
    console.log("as_learn_flip", params);
    this._learn_flip(params);
  }

  _learn_flip(params) {
    console.log("_learn_flip", params);
    const {evolve, unit, step, flip, word} = params;
    const f = flip == "0" ? 1 : 0;
    this.props.navigate(`/evolve/${evolve}/unit/${unit}/step/${step}/flip/${f}`);
  }

  ui_result(params) {
    console.log("ui_result", params);
    this.props.navigate(`/resultlear`);
  }

  ui_restart(params) {
    console.log("ui_restart", params);
    this.props.navigate(`/`);
  }

  render() {
    console.log("render");

    if (this.firstRender) {
      console.log("firstRender: Navigate to=/");
      this.firstRender = false;
      return (
        <Navigate to={'/'}/>
      )
    }

    return (
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to="/evolve"/>}
        />

        <Route
          path="/evolve"
          element={
            <Evolves
              onOpen={() => this.ui_evolve_loaded()}
              onChoose={({evolve}) => this.ui_evolve_choose({evolve})}
            />
          }
        />

        <Route
          path="/evolve/:evolve/unit"
          element={
            <Units
              onOpen={({evolve}) => this.ui_unit_loaded({evolve})}
              onBack={(evolve) => this.ui_back(evolve)}
              onChoose={({evolve, unit}) => this.ui_unit_choose({evolve, unit})}
            />
          }
        />

        <Route
          path="/evolve/:evolve/unit/:unit/step/:step/flip/:flip"
          // render={this.state}
          element={
            <CardsLearning
              onOpen={(params) => this.ui_learn_loaded(params)}
              onBack={(params) => this.ui_back(params)}
              onNext={(params) => this.ui_learn_next(params)}
              onPrev={(params) => this.ui_learn_prev(params)}
              onFlip={(params) => this.ui_learn_flip(params)}
              onResult={(params) => this.ui_result(params)}
            />
          }
        />

        <Route
          path="/resultlear"
          element={<Resultlear
            onRestart={(params) => this.ui_restart()}
          />}
        />
      </Routes>
    );
  }
}

export default App;
