// @flow

import * as React from "react";
import { Toolbar, BackButton } from "react-onsenui";

type Props  = {
  backButton: Boolean,
  navigator: Object,
  title: String,
}

function NavBar(props: Props) {
  return (
    <Toolbar>
      <div className="left">
        {props.backButton ? (
          <BackButton>Back</BackButton>
        ) : null}
      </div>
      <div className="center">{props.title}</div>
    </Toolbar>
  );
}

export default NavBar;
