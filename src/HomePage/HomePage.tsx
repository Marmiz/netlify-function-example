import * as React from "react";
import { Page, Button } from "react-onsenui";
import NavBar from "../NavBar/index";
import withAuth from "./PrivateRoute";

import { HomePageProps } from "./index";

function HomePage(props: HomePageProps) {
  const onLogin = () => {
    props.netlifyAuth.authenticate();
  };

  return (
    <Page
      renderToolbar={() => (
        <NavBar navigator={props.navigator} title="Training Log" />
      )}
    >
      {props.netlifyAuth.isAuthenticated ? (
        <p>Already logged in</p>
      ) : (
        <Button onClick={onLogin}>log in</Button>
      )}
    </Page>
  );
}

export default withAuth(HomePage);
