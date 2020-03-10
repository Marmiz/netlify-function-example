import React from "react";
import { Page } from "react-onsenui";
import NavBar from "../NavBar";

function HomePage(props) {
  return (
    <Page
      renderToolbar={() => (
        <NavBar navigator={props.navigator} title="Training Log" backButton/>
      )}
    >
      "list coming soon"
    </Page>
  );
}


export default HomePage;


/*

  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    const isInStorage = checkStorage("all_customers");
    if (isInStorage) {
      let storageData = localStorage.getItem("all_customers");
      if(storageData) {
        storageData = JSON.parse(storageData);
        setData(storageData.data);
      }
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch(
          "/.netlify/functions/read_all?q=all_products",
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

*/
