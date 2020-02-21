import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      const result = await fetch("/.netlify/functions/read_all?q=all_customers", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const res = await result.json();

      console.log(res);
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>This</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
