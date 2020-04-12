import React from "react";
import { List, ListItem } from "react-onsenui";
import { Training } from "./index";

type ExtrasListProps = {
  data: Training[];
  addExtras: (extra: { id: string; name: string }) => void;
};

function ExtrasList({ data, addExtras }: ExtrasListProps) {
  const extrasData = data.filter(el => el.type === "extra");
  return (
    <List
      dataSource={extrasData}
      renderHeader={() => <p>Extras</p>}
      modifier="noborder"
      renderRow={(row, idx) => (
        <ListItem
          key={idx}
          modifier={idx === extrasData.length - 1 ? "longdivider" : undefined}
          tappable
          onClick={() => addExtras(row)}
        >
          <div className="center">{row.name}</div>
        </ListItem>
      )}
    />
  );
}

export default ExtrasList;
