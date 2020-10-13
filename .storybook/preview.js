import {
  Theme as AugmentedTheme,
  StylesProvider,
  ThemeProvider,
  createMuiTheme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

import React from "react";
import { defaultTheme } from "../src/theme/defaultTheme";

const theme = createMuiTheme(defaultTheme);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </StylesProvider>
  ),
];
