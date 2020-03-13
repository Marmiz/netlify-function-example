import * as React from "react";
import {Page} from "react-onsenui";
import NavBar from "../NavBar/index";

type TrainingProps = {
  navigator: Navigator;
}

function AddTraining(props: TrainingProps) {
  const addTraining = () => {
    fetch('/.netlify/functions/add_training', {
      body: JSON.stringify({data: 'fake'}),
      method: 'POST',
    })
    .then(res => console.log(res))
    .catch(error => console.error(error))
  }
  return (
    <Page
        renderToolbar={() => (
          <NavBar navigator={props.navigator} title="Training Log" backButton/>
        )}
      >
        <button
          onClick={addTraining}
        >add training</button>
      </Page>
  )
}

export default AddTraining;
