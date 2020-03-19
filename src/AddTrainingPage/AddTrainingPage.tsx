import * as React from "react";
import { Page, BottomToolbar, ProgressBar } from "react-onsenui";
import NavBar from "../NavBar/index";
import useAsync from "../utils/useAsync";
import { getData } from "../utils/fetch";
import TrainingList from "./TrainingList";
import { ResponseObject } from "../utils/useAsync";
import { Training } from "./TrainingList";

export type TrainingProps = {
  navigator: {
    popPage: () => void;
  };
};

const getAllProducts = getData("all_products");

const extractProductData = (fromApi: ResponseObject | null): Training[] => {
  if (!fromApi) return [];

  return fromApi.data.map(d => Object.assign({}, { name: "" }, d.data));
};

function AddTraining(props: TrainingProps) {
  const { pending, value, error } = useAsync(getAllProducts);

  const addTraining = () => {
    fetch("/.netlify/functions/add_training", {
      body: JSON.stringify({ data: "fake" }),
      method: "POST"
    })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  };

  return (
    <Page
      renderToolbar={() => (
        <NavBar navigator={props.navigator} title="Add Training" backButton />
      )}
    >
      {pending ? (
        <ProgressBar indeterminate />
      ) : error ? (
        <p>error</p>
      ) : (
        <TrainingList data={extractProductData(value)} />
      )}
      <button onClick={addTraining}>add training</button>
      <BottomToolbar modifier="aligned">
        <button onClick={() => props.navigator.popPage()}>GoTo Favorite</button>
      </BottomToolbar>
    </Page>
  );
}

export default AddTraining;
