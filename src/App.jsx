import React from "react";

import {createSmartappDebugger, createAssistant} from "@salutejs/client";
import {useTransition, animated} from "@react-spring/web";
import Evolves from "./components/Evolves";
import Units from "./components/Units";
import CardsLearning from "./components/CardsLearning";
import Resultlear from "./components/Resultlear";
import {
  Navigate,
  Route,
  useLocation,
  useNavigate,
  Link,
  useRouteMatch, matchPath,
} from "react-router-dom";
import {Routes} from "react-router-dom";
import { customHistory } from "./customHistory";

import "./App.css";


// interface State {
//   notes: [{title: string}, {title: string}, {title: string}];
//   evolve: string | undefined;
//   unit: string | undefined;
// }


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
      this.evolveOpened();
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


  evolveOpened() {
    this._send_action("evolve_start_1", {});
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

        // case "back":
        //   return this.back(action);

        // case "mode_choose":
        //   return this.mode_choose(action);

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

  as_evolve_choose(action) {
    console.log("as_evolve_choose", action);
    const evolve = action.params.evolve || 1;

    this.props.navigate(`/evolve/${evolve}/unit`);
    // customHistory.push(`/evolve/${evolve}/unit`);
    // this._send_action("unit", { evolve });

    // this._send_action("evolve", {note: action.note});
    // if (action.note != undefined) {
    // this.setState(
    //   {
    //     // notes: [
    //     //   {
    //     //     title: action.note,
    //     //   },
    //     //   ...this.state.notes.slice(1),
    //     // ],
    //   },
    //   () => console.log("evolve_choose: setState:", this.state)
    // );
    // }
  }

  evolve_back(action) {
    console.log("evolve_back", action);
    this.props.navigate(-1);

    // this._send_action("evolve", {note: action.note});
    // if (action.note != undefined) {
    // this.setState(
    //   {
    //     // notes: [
    //     //   {
    //     //     title: action.note,
    //     //   },
    //     //   ...this.state.notes.slice(1),
    //     // ],
    //   },
    //   () => console.log("evolve_choose: setState:", this.state)
    // );
    // }
  }

  as_unit_choose(action) {
    console.log("as_unit_choose: action:", action);
    // console.log('as_unit_choose: customHistory', customHistory);
    // const pathname = customHistory.location.pathname;
    // console.log('unit_choose: typeof pathname:', typeof pathname, 'pathname:', pathname)
    //
    // const pattern = {
    //   path: "/evolve/:evolve", // /unit/:unit
    //   exact: false,
    //   end: false
    // };
    // const match = matchPath(pattern, pathname);
    // // let match = useRouteMatch("/blog/:slug");
    // console.log("unit_choose: match:", match);
    //
    // const evolve = match?.params?.evolve;
    // // const unit = action.unit || 1;
    // const unit = action.params.unit || 1;
    const evolve = parseInt(action.params.evolve);
    const unit = parseInt(action.params.unit);

    this.props.navigate(`/evolve/${evolve}/unit/${unit}/step/0`);
    // this._send_action("unit", { evolve, unit });

    // this._send_action("unit", {note: action.note});
    // if (action.note !== undefined) {
    //   this.setState(
    //     {
    //       notes: [
    //         this.state.notes[0],
    //         {
    //           title: action.note,
    //         },
    //         ...this.state.notes.slice(2),
    //       ],
    //     },
    //     () => console.log(this.state)
    //   );
    // }
  }

  // mode_choose(action) {
  //   console.log("mode_choose", action);
  //   this.setState(
  //     {
  //       notes: [
  //         this.state.notes[0],
  //         this.state.notes[1],
  //         {
  //           title: action.note,
  //         },
  //         ...this.state.notes.slice(3),
  //       ],
  //     },
  //     () => console.log(this.state)
  //   );
  // }

  // back_unit(action) {
  //   console.log("back_unit", action);
  //   this.setState(
  //     {
  //       notes: [
  //         ...this.state.notes,
  //         {
  //           title: action.note,
  //         },
  //       ],
  //     },
  //     () => console.log(this.state)
  //   );
  //   // window.location.href = "/";
  //   this.props.navigate("/");
  // }

  // back_cards(action) {
  //   console.log("back_cards", action);
  //   this._send_action("back_cards", {note: action.note});
  //   this.setState(
  //     {
  //       notes: [
  //         this.state.notes[0],
  //         this.state.notes[1],
  //         {
  //           title: action.note,
  //         },
  //         ...this.state.notes.slice(3),
  //       ],
  //     },
  //     () => console.log(this.state)
  //   );
  //   this.props.navigate("/unit");
  // }

  // learn_translate(action) {
  //   console.log("learn_translate", action);
  // }

  as_learn_flip(action) {
    console.log("as_learn_flip", action);
  }

  //

  as_learn_next(action) {
    console.log("as_learn_next", action);
    const evolve = parseInt(action.params.evolve);
    const unit = parseInt(action.params.unit);
    const step = parseInt(action.params.step);
    this.do_learn_next({evolve,unit,step});
  }
  do_learn_next({evolve,unit,step}) {
    console.log("do_learn_next", {evolve,unit,step});
    this.props.navigate(`/evolve/${evolve}/unit/${unit}/step/${step+1}`);
  }

  //

  as_learn_prev(action) {
    console.log("as_learn_prev", action);
    console.log('as_learn_prev: customHistory', customHistory);

    const pathname = customHistory.location.pathname;
    console.log('as_learn_prev: typeof pathname:', typeof pathname, 'pathname:', pathname)

    const evolve = parseInt(action.params.evolve);
    const unit = parseInt(action.params.unit);
    const step = parseInt(action.params.step);

    this.props.navigate(`/evolve/${evolve}/unit/${unit}/step/${step-1}`);
  }

  as_end(action) {
    console.log("as_end", action);
    this.setState({
      // notes: [
      //   ...this.state.notes,
      //   {
      //     id: Math.random().toString(36).substring(7),
      //     title: action.note,
      //     completed: false,
      //   },
      // ],
    });
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
              onOpen={(params) => {
                // this.evolve_choose({ type: "evolve_choose", note });
                // this._send_action("back_cards", {});
                this._send_action("evolve_start_2", params);
              }}
              // onEvolve={(note) => {
              //   this.evolve_choose({type: "evolve_choose", note});
              // }}
              // onChangeEv={this.state}
            />
          }
        />
        <Route
          path="/evolve/:evolve/unit"
          element={
            <Units
              onOpen={(params) => {
                // this.evolve_choose({ type: "evolve_choose", note });
                this._send_action("unit_start_2", params);
              }}
              // onUnit={(note) => {
              //   this.unit_choose({type: "unit_choose", note});
              // }}
              // onChangeUn={this.state}
            />
          }
        />
        <Route
          path="/evolve/:evolve/unit/:unit/step/:step"
          // render={this.state}
          element={
            <CardsLearning
              onOpen={(params) => {
                // this.evolve_choose({ type: "evolve_choose", note });
                this._send_action("learn_start_2", params);
              }}
              onLearns={(note) => {
                this.end({type: "end", note});
              }}
              // onLearn={this.state}
              // onBackCards={(note) => {
              //   this.back_cards({type: "back_cards", note});
              //}}
            />
          }
        />
        <Route
          path="/resultlear"
          element={<Resultlear/>}
        />
      </Routes>
    );
  }
}

export default App;
