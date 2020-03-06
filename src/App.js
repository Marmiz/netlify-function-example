import React, { useEffect, useState } from "react";

import { Page, Tabbar, Tab } from "react-onsenui";

import { CustomerCard } from "./CustomerCard";
import { checkStorage, setStorageData } from "./utils/storage";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const isInStorage = checkStorage("all_customers");
    if (isInStorage) {
      let storageData = localStorage.getItem("all_customers");
      storageData = JSON.parse(storageData);
      setData(storageData.data);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(
          "/.netlify/functions/read_all?q=all_customers",
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
          setStorageData("all_customers", data);
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

  return (
    <Page>
      {isLoading || !data ? (
        "loading..."
      ) : (
        <React.Fragment>
          <Tabbar
            index={0}
            renderTabs={(activeIndex, tabbar) => [
              {
                content: (
                  <Page active={activeIndex === 0} title="home">Home</Page>
                ),
                tab: <Tab label="Home" icon="md-home" />
              },
              {
                content: (
                  <Page active={activeIndex === 1}>settings</Page>
                ),
                tab: <Tab label="Settings" icon="md-settings" />
              }
            ]}
          />
          {data.map(customer => (
            <CustomerCard customer={customer} key={customer.ref["@ref"].id} />
          ))}
        </React.Fragment>
      )}
    </Page>
  );
}

export default App;
