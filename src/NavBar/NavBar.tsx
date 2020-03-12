import * as React from "react";
import { Toolbar, BackButton } from "react-onsenui";

type NavBarProps  = {
  backButton?: boolean,
  navigator: Object,
  title: String,
}

function NavBar(props: NavBarProps) {
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
