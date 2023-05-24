import React from 'react';

import {
  createSmartappDebugger,
  createAssistant,
} from "@salutejs/client";
import { Navigate } from 'react-router-dom';
import { useTransition, animated } from '@react-spring/web'
import Evolves from "./components/Evolves"
import Units from "./components/Units"
import CardsLearning from "./components/CardsLearning"
import Resultlear from "./components/Resultlear"
import { BrowserRouter as Router,Route,Routes,useLocation } from 'react-router-dom';
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
      notes: [{"title": "no"},{"title": "no"}],
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
  evolve_choose (action) {
    console.log('evolve_choose', action);
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
        ...this.state.notes,
        {
          title:      action.note,
        },
      ],
    })
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
      <Router>
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
              />} />
              <Route path="/resultlear" element={<Resultlear />} />

            </Routes>
      </Router >
    );
  }
}
export default App;
