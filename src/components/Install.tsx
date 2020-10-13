import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { Typography } from "@material-ui/core";

const Icon = ({ primary = false }) => (
  <div
    style={{
      flex: "0 0 auto",
      width: "55px",
      height: "55px",
      backgroundColor: primary ? "black" : "#dddddd",
      borderRadius: "8px",
      margin: "0 4px",
    }}
  />
);

export interface InstallProps {}

export const Install: React.FC<InstallProps> = () => {
  return (
    <Box maxWidth="min(280px, calc(100vw - 64px))" mx="auto">
      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <IconButton aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        pt={1}
        pb={4}
      >
        {[0, 1, 2, 3, 4, 5, 6].map((d, i) => (
          <Icon key={i} primary={i === 3} />
        ))}
      </Box>
      <Box textAlign="center" px={2} pb={2}>
        <Box pb={2}>
          <Typography variant="h1">Install Changing Places</Typography>
        </Box>
        <Box pb={6}>
          <Typography variant="body1">
            Install this application on your home screen for quick and easy
            access when you're on the go.
          </Typography>
        </Box>
        <Typography variant="body1">
          Just tap{" "}
          <svg width={16} height={16} viewBox="0 0 100 100">
            <g transform="translate(0.000000,2000.000000) scale(0.100000,-0.100000)">
              <path
                fill="#000000"
                d="M438.398,19934.838c-33.604-35.895-61.094-65.371-61.094-65.576c0-0.152,4.888-4.834,10.791-10.332   l10.845-10.029l4.482,4.736c2.441,2.592,6.157,6.566,8.296,8.803c2.09,2.242,15.684,16.803,30.293,32.33   c14.561,15.527,28.965,30.957,32.07,34.262l5.557,5.957l0.254-280.928l0.254-280.928l1.523-3.008   c5.498-10.791,21.484-10.684,26.836,0.156l1.172,2.393l0.254,286.328l0.254,286.27l10.43-11.098   c5.811-6.158,18.945-20.211,29.277-31.256c20.059-21.436,41.445-44.242,47.197-50.254l3.564-3.662l10.742,9.977   c5.957,5.449,10.791,10.131,10.791,10.283c0,0.41-121.934,130.59-122.393,130.74   C499.639,20000.057,472.002,19970.73,438.398,19934.838z"
              />
              <path
                fill="#000000"
                d="M163.779,19772.787c-5.039-0.865-13.438-3.564-17.969-5.855c-17.769-8.857-30.596-25.557-34.873-45.361   c-0.869-4.023-0.918-19.502-0.918-334.639c0-279.043,0.103-330.977,0.713-333.984c5.244-26.475,24.639-46.123,51.523-51.973   c4.121-0.918,14.761-0.967,337.744-0.967c320.586,0,333.623,0.049,337.793,0.908c25.918,5.557,44.854,24.082,51.064,50l1.123,4.58   v330.928c0,315.645-0.049,331.123-0.918,335.146c-2.9,13.34-9.57,25.303-19.189,34.365c-7.08,6.617-14.766,11.25-24.082,14.355   c-10.537,3.516-0.967,3.311-145.303,3.311H570v-14.766v-14.766h128.711c137.861-0.049,132.363,0.055,139.238-2.543   c4.229-1.578,10.029-5.65,13.34-9.316c3.457-3.867,7.129-10.996,8.145-15.885c0.664-3.105,0.762-45.668,0.762-329.648   c0-324.922,0-326.094-1.016-330.371c-3.008-12.471-12.979-22.5-25.713-25.752c-2.695-0.664-38.076-0.771-333.467-0.771   c-294.98,0-330.771,0.107-333.467,0.771c-12.729,3.252-22.71,13.281-25.713,25.752c-1.016,4.277-1.016,5.449-1.016,330.371   c0,283.98,0.098,326.543,0.762,329.648c1.016,4.889,4.683,12.018,8.145,15.885c3.311,3.666,9.116,7.738,13.34,9.316   c6.875,2.598,2.139,2.494,129.365,2.543h118.726l-0.103,14.664l-0.151,14.613l-120.913,0.049   C187.046,19773.5,167.397,19773.396,163.779,19772.787z"
              />
            </g>
          </svg>{" "}
          then 'Add to Home Screen'
        </Typography>
      </Box>
    </Box>
  );
};
