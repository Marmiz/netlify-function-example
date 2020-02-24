import React, { useEffect, useState } from "react";
import "./App.css";

import { CustomerCard } from "./CustomerCard";
import { checkStorage, setStorageData } from "./utils/storage";

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isInStorage = checkStorage('all_customers');
    if(isInStorage) {
      let storageData = localStorage.getItem('all_customers');
      storageData = JSON.parse(storageData);
      setData(storageData.data);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetch("/.netlify/functions/read_all?q=all_customers", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        const { data } = await result.json();

        setStorageData('all_customers', data);
        setData(data);
      } catch(error) {
        console.error(error)
      }

      setIsLoading(false)
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading || !data ? (
        'loading...'
      ): (
        <div>
          {data.map(customer => (
            <CustomerCard customer={customer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
