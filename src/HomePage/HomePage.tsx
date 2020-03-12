import React, { useState, useEffect } from "react";
import { Page, Navigator, List, ProgressBar } from "react-onsenui";
import NavBar from "../NavBar/index";

type HomePageProps = {
  navigator: Navigator;
};

function HomePage(props: HomePageProps) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(
          "/.netlify/functions/read_all?q=all_trainings",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        );
        const { data } = await result.json();
        if (!didCancel) {
          // console.log(didCancel)
          setData(data);
        }
      } catch (error) {
        if (!didCancel) {
          console.error(error);
        }
      }

      setIsLoading(false);
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  if(isLoading) {
    return (
      <ProgressBar indeterminate />
    )
  }

  return (
    <Page
      renderToolbar={() => (
        <NavBar navigator={props.navigator} title="Training Log" />
      )}
    >
      {data.length ? (
        <List
          dataSource={data}
          renderRow={training => <div>train {training}</div>}
        />
      ) : (
        <div>Looks like there's no training for this period</div>
      )}
    </Page>
  );
}

export default HomePage;

/*

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);


      const isInStorage = checkStorage("all_customers");
    if (isInStorage) {
      let storageData = localStorage.getItem("all_customers");
      if(storageData) {
        storageData = JSON.parse(storageData);
        setData(storageData.data);
      }
      return;
    }

    setStorageData("all_customers", data);

*/
