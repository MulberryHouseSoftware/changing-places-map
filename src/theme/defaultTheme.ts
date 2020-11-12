export const defaultTheme = {
  palette: {
    primary: { main: "#0072bb" },
    secondary: { main: "#38E1F5" },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "1.43rem",
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: "1rem",
    },
    h3: {
      fontWeight: 700,
      fontSize: "0.875rem",
      "@media (max-width:600px)": {
        fontSize: "0.825rem",
      },
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
};
