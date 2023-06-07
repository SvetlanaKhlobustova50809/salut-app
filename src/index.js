import React from "react";
import ReactDOM from "react-dom/client";
import {DeviceThemeProvider} from '@salutejs/plasma-ui/components/Device'; // Типографика, имеющая размеры, зависимые
                                                                           // от типа устройства
import {GlobalStyle} from './GlobalStyle'; // Тема оформления (цветовая схема)
import App from './App';
import {BrowserRouter as Router, useNavigate} from "react-router-dom";
import {createBrowserHistory} from "history";

export const customHistory = createBrowserHistory();

// import { Routes } from "react-router-dom";

function AppWithNavigation(props) {
  const navigate = useNavigate();
  return <App
    navigate={(...args) => {
      console.log('AppWithNavigation', args);
      return navigate(...args);
    }}
  />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DeviceThemeProvider>
    <GlobalStyle/>
    <Router
      history={customHistory}
    >
      <AppWithNavigation/>
    </Router>
  </DeviceThemeProvider>
);
