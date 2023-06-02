import React from 'react';

import {
  createSmartappDebugger,
  createAssistant,
} from "@salutejs/client";
import { useTransition, animated } from '@react-spring/web'
import Evolves from "./components/Evolves"
import Units from "./components/Units"
import CardsLearning from "./components/CardsLearning"
import Resultlear from "./components/Resultlear"
import { Route,useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";

import "./App.css";



const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    }); 
  }
  return createAssistant({ getState });
};



export class App extends React.Component {

  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      notes: [{"title": "no"},{"title": "no"},{"title":"no"}],
    }

    this.assistant = initializeAssistant(() => this.getStateForAssistant());
    this.assistant.on("data", (event/*: any*/) => {
      console.log(`assistant.on(data)`, event);
      const { action } = event
      this.dispatchAssistantAction(action);
    });
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });

  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  getStateForAssistant() {
    console.log('getStateForAssistant: this.state:', this.state)
    const state = {
      item_selector: {
        items: this.state.notes.map(
          ({ id, title }, index) => ({
            number: index + 1,
            id,
            title,
          })
        ),
      },
    };
    console.log('getStateForAssistant: state:', state)
    return state;
  }

  dispatchAssistantAction (action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'evolve_choose':
          return this.evolve_choose(action);

        case 'unit_choose':
          return this.unit_choose(action);

        case 'mode_choose':
          return this.mode_choose(action);
        case 'end':
          return this.end(action);

        default:
          throw new Error();
      }
    }
  }
  _send_action(action_id, value) {
    const data = {
      action: {
        action_id: action_id,
        parameters: {   // значение поля parameters может любым, но должно соответствовать серверной логике
          value: value, // см.файл src/sc/noteDone.sc смартаппа в Studio Code
        }
      }
    };
    const unsubscribe = this.assistant.sendData(
      data,
      (data) => {   // функция, вызываемая, если на sendData() был отправлен ответ
        const {type, payload} = data;
        console.log('sendData onData:', type, payload);
        unsubscribe();
      });
    }

  evolve_choose (action) {
    console.log('evolve_choose', action);

    this.props.navigate('/Unit');

    this._send_action('evolve', {'note':action.note} );
    if (action.note != undefined){
      this.setState({
          notes: [
            {
              title:    action.note,
            },
            ...this.state.notes.slice(1),
          ],
      })
    }
  }

  unit_choose (action) {
    console.log('unit_choose', action);    
    this._send_action('unit', {'note':action.note} );
     if (action.note != undefined){
    this.setState({
      notes: [
        this.state.notes[0],
        {
          title:     action.note,
        },
        ...this.state.notes.slice(2),
      ],
    })
  }}
  mode_choose (action) {
    console.log('mode_choose', action);
    this.setState({
      notes: [
        this.state.notes[0],this.state.notes[1],
        {
          title:     action.note,
        },
        ...this.state.notes.slice(3),
      ],
    })
  }
  back_unit (action) {
    console.log('back_unit', action);
    this.setState({
      notes: [
        ...this.state.notes,
        {
          title:      action.note,
        },
      ],
    })
    window.location.href = "/";
  }
  back_cards (action) {
    console.log('back_cards', action);
    this._send_action('back_cards', {'note':action.note} );
    this.setState({
      notes: [
        this.state.notes[0],this.state.notes[1],
        {
          title:     action.note,
        },
        ...this.state.notes.slice(3),
      ],
    })
    this.props.navigate('/Unit');
  }
  end (action) {
    console.log('end', action);
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id:        Math.random().toString(36).substring(7),
          title:     action.note,
          completed: false,
        },
      ],
    })
  }
  render() {
    console.log('render');
    
    return (
      <Routes>

              <Route path="/" element={ 
              <Evolves 
                  onEvolve={ (note)=>{this.evolve_choose({ type: "evolve_choose", note }); } }
                  onChangeEv = {(this.state)}
                  />} />
              <Route path="/unit" element={
              <Units 
                  onUnit={ (note)=>{this.unit_choose({ type: "unit_choose", note }); } }
                  onChangeUn = {(this.state)}
                  />} />
              <Route path="/learning" render={this.state} element={
              <CardsLearning 
              onLearns={ (note)=>{this.end({ type: "end", note }); } }
              onLearn = {(this.state)}
              onBackCards = { (note)=>{this.back_cards({ type: "back_cards", note }); } }
              />} />
              <Route path="/resultlear" element={<Resultlear />} />
              </Routes>

    );
  }
}
export default App;
