import AddTraining from "./AddTrainingPage";
import "./recap.css";

export type Training = {
  name: string;
  id: string;
  duration?: number;
  cost?: number;
  type?: string;
};

export type Extra = {
  id: string;
  quantity: number;
  name: string;
  price?: number;
};

export default AddTraining;
