import React from "react";
import ReactDOM from "react-dom/client";
import {DeviceThemeProvider} from '@salutejs/plasma-ui/components/Device'; // Типографика, имеющая размеры, зависимые
                                                                           // от типа устройства
import {GlobalStyle} from './GlobalStyle'; // Тема оформления (цветовая схема)
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DeviceThemeProvider>
    <GlobalStyle/>
    <App/>
  </DeviceThemeProvider>
);
