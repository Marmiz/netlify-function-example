import * as React from "react";
import { Extra, Training } from "./index";
import Card from "../Card";

type RecapProps = {
  extras: Extra[];
  training: Training | null;
  onClose: (id: string) => void;
};

function Recap({ training, extras, onClose }: RecapProps) {
  let extraPartialTotal = extras.reduce(
    (acc: number, current: Extra): number => {
      return current.price ? current.price * current.quantity + acc : acc;
    },
    0
  );

  let total = training
    ? training.cost
      ? training.cost + extraPartialTotal
      : extraPartialTotal
    : extraPartialTotal;
  return (
    <div className="recap">
      {training && <Card closeCb={() => onClose("")}>{training.name}</Card>}
      {extras.map(e => (
        <Card key={e.id} closeCb={() => onClose(e.id)}>
          {e.name} {e.quantity}
        </Card>
      ))}
      <p>total: {total}</p>
    </div>
  );
}

export default Recap;
