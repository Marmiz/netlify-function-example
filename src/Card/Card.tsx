import * as React from "react";
import { CardProps } from "./index";
import { Button, Icon } from "react-onsenui";

function Card(props: CardProps) {
  return (
    <div className="card">
      {props.closable && (
        <Button
          className="close-button"
          {...(props.closeCb && { onClick: props.closeCb })}
        >
          <Icon icon="fa-times" size={18} fixedWidth />
        </Button>
      )}
      {props.children}
    </div>
  );
}

Card.defaultProps = {
  closable: true
};

export default Card;
