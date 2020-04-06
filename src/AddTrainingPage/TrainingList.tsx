import React from "react";
import { List, ListItem } from "react-onsenui";
import { Training } from "./index";

type TrainingListProps = {
  data: Training[];
  addTraining: (training: Training) => void;
};

function TrainingList({ data, addTraining }: TrainingListProps) {
  const trainingData = data.filter(d => d.type === "training");
  return (
    <List
      dataSource={trainingData}
      renderHeader={() => <p>Training</p>}
      modifier="noborder"
      renderRow={(row, idx) => (
        <ListItem
          key={idx}
          modifier={idx === trainingData.length - 1 ? "longdivider" : undefined}
          tappable
          onClick={() => addTraining(row)}
          className="training_item"
        >
          <div className="center">{row.name}</div>
        </ListItem>
      )}
    />
  );
}

export default TrainingList;
