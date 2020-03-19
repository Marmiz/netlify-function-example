import React from "react";
import { List, ListItem } from "react-onsenui";

type TrainingListProps = {
  data: Training[];
};

export type Training = {
  name: string;
  diration?: number;
  cost?: number;
  type?: string;
};

function TrainingList({ data }: TrainingListProps) {
  const trainingData = data.filter(d => d.type === "training");
  return (
    <List
      dataSource={trainingData}
      renderHeader={() => <p>Training</p>}
      renderRow={(row, idx) => (
        <ListItem
          modifier={idx === trainingData.length - 1 ? "longdivider" : undefined}
        >
          {row.name}
        </ListItem>
      )}
    />
  );
}

export default TrainingList;
