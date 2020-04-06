import * as React from "react";
import { Extra, Training } from "./index";
import Card from "../Card";

type RecapProps = {
  extras: Extra[];
  training: Training | null;
};

function Reacp({ training, extras }: RecapProps) {
  return (
    <div className="recap">
      {training && <Card>{training.name}</Card>}
      {extras.map(e => (
        <Card key={e.id}>
          {e.name} {e.quantity}
        </Card>
      ))}
    </div>
  );
}

export default Reacp;
