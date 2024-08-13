import "./index.css";
import "@fontsource/roboto";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createTheme,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import PWAPrompt from "react-ios-pwa-prompt";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { defaultTheme } from "./theme/defaultTheme";

const theme = createTheme(defaultTheme);

const render = () =>
  ReactDOM.render(
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <PWAPrompt
            promptOnVisit={2}
            copyTitle="Install Changing Places International Map"
            copyBody="Install this application on your home screen for quick and easy
            access when you're on the go."
          />
        </ThemeProvider>
      </StylesProvider>
    </Router>,
    document.getElementById("root")
  );

// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&loading=async&callback=initMap&&libraries=geometry,places&v=weekly`;
script.async = true;

declare global {
  interface Window {
    initMap: () => void;
  }
}

script.onerror = function () {
  console.error("Failed to load the Google Maps API script.");
};

// Attach your callback function to the `window` object
window.initMap = function () {
  render();
};

// Append the 'script' element to 'head'
document.head.appendChild(script);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
