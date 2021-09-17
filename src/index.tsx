import "./index.css";
import "@fontsource/roboto";

import {
  StylesProvider,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";

import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import PWAPrompt from "react-ios-pwa-prompt";
import ReactDOM from "react-dom";
import { defaultTheme } from "./theme/defaultTheme";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const theme = createTheme(defaultTheme);

const render = () =>
  ReactDOM.render(
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
    </StylesProvider>,
    document.getElementById("root")
  );

// Create the script tag, set the appropriate attributes
var script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap&&libraries=geometry,places&v=weekly`;
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
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
