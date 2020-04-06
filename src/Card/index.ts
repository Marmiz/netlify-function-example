import * as React from "react";
import Card from "./Card";
import "./card.css";

export type CardProps = {
  children: React.ReactNode;
  closable: boolean;
};

export default Card;
