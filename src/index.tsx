import "./index.css";
import "fontsource-roboto";

import * as serviceWorker from "./serviceWorker";

import {
  StylesProvider,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { defaultTheme } from "./theme/defaultTheme";

const theme = createMuiTheme(defaultTheme);

const render = () =>
  ReactDOM.render(
    <React.StrictMode>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StylesProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );

// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src =
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap&&libraries=geometry,places&v=weekly`;
script.defer = true;

declare global {
  interface Window {
    initMap: () => void;
  }
}

// Attach your callback function to the `window` object
window.initMap = function () {
  render();
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
