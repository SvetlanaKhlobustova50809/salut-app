import React from "react";
import ReactDOM from "react-dom/client";
import {DeviceThemeProvider} from '@salutejs/plasma-ui/components/Device'; // Типографика, имеющая размеры, зависимые
                                                                           // от типа устройства
import {GlobalStyle} from './GlobalStyle'; // Тема оформления (цветовая схема)
import App from './App';
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
// import { Routes } from "react-router-dom";

function AppWithNavigation(props) {
  const navigate = useNavigate();
  return <App navigate={navigate} />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DeviceThemeProvider>
    <GlobalStyle/>
    <Router>
    <AppWithNavigation/>
    </Router >
  </DeviceThemeProvider>
);
