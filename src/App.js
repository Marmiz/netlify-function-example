// @flow
import * as React from "react";

import { Navigator } from "react-onsenui";
import HomePage from "./HomePage";

type Route = {
  key: string,
  component: React.ComponentType<{}>
}

const renderPage = (route: Route, navigator) => (
  <route.component key={route.key} navigator={navigator} />
);

function App() {
  return (
    <Navigator renderPage={renderPage} initialRoute={{ component: HomePage, key: "HOME_PAGE" }} />
  )

}

export default App;
