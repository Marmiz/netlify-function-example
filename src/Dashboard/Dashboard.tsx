import * as React from "react";
import { Page, ProgressBar, Fab, Icon } from "react-onsenui";
import NavBar from "../NavBar/index";
import AddTraining from "../AddTrainingPage/index";
import useAsync from "../utils/useAsync";
import { getData } from "../utils/fetch";

import { DashboardProps } from "./index";
const getTraining = getData("all_orders");

function Dashboard(props: DashboardProps) {
  const { pending, value, error } = useAsync(getTraining, false);

  const addTraining = () => {
    props.navigator.pushPage({ component: AddTraining, key: "ADD_TRAINING" });
  };

  if (pending) {
    return (
      <Page
        renderToolbar={() => (
          <NavBar navigator={props.navigator} title="Training Log" />
        )}
      >
        <ProgressBar indeterminate />
      </Page>
    );
  }

  if (error || !value) {
    return (
      <Page
        renderToolbar={() => (
          <NavBar navigator={props.navigator} title="Training Log" />
        )}
      >
        <p>An Error occurred</p>
        <Fab onClick={addTraining}>
          <Icon icon="fa-plus" size={26} fixedWidth={false} />
        </Fab>
      </Page>
    );
  }

  // const { data } = value;
  return (
    <Page
      renderToolbar={() => (
        <NavBar navigator={props.navigator} title="Training Log" />
      )}
    >
      {/* {data.length ? (
        <List
          dataSource={data}
          renderRow={training => <div>train {training}</div>}
        />
      ) : (
        <div>Looks like there's no training for this period</div>
      )} */}
      <Fab onClick={addTraining}>
        <Icon icon="fa-plus" size={26} fixedWidth={false} />
      </Fab>
    </Page>
  );
}

export default Dashboard;
