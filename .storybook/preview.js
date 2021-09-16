import {
  Theme as AugmentedTheme,
  StylesProvider,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";

import { MemoryRouter } from "react-router-dom";

import React from "react";
import { defaultTheme } from "../src/theme/defaultTheme";

const theme = createTheme(defaultTheme);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </StylesProvider>
    </MemoryRouter>
  ),
];
