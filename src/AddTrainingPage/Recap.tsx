import * as React from "react";
import { Extra, Training } from "./index";

type RecapProps = {
  extras: Extra[];
  training: Training | null;
};

function Reacp({ training, extras }: RecapProps) {
  return (
    <div className="recap">
      {training && <div className="recap__training">{training.name}</div>}
      {extras.map(e => (
        <div className="recap__extra" key={e.id}>
          {e.name} {e.quantity}
        </div>
      ))}
    </div>
  );
}

export default Reacp;
