# Changing Places International Map

A mobile-friendly map of accessible toilets.

## Google Maps API

You must provide a Google Maps API key. This should be exposed using the environment variable `REACT_APP_GOOGLE_MAPS_API_KEY`. Make sure that this key has access to the Places service.

When running in production please ensure that the key is adequately secured.

Additionally, you should set the environment variable `STORYBOOK_GOOGLE_MAPS_API_KEY` to a valid API key to run the Storybook stories which use the Google Maps API.

## Google Analytics

You must provide a Google Analytics measurement id. This should be exposed using the environment variable `REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
