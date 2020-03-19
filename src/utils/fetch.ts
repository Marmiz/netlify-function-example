export const getData = (query: string): (() => Promise<any>) => () => {
  return new Promise((resolve, reject) => {
    fetch(`/.netlify/functions/read_all?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
};
