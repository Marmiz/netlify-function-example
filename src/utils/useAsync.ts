import * as React from "react";

type AsyncFunction = () => Promise<any>;

type FaunaResponse = {
  ref: object;
  ts: number;
  data: object;
};

export type ResponseObject = {
  data: Array<FaunaResponse>;
};

// hook
function useAsync(asyncFunction: AsyncFunction, immediate = true) {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [value, setValue] = React.useState<ResponseObject | null>(null);

  // wrap asyncFunction into an execute function
  // that takes care of internal state manangement
  // it wraps in useCallback so it will won't run on each render
  // but only if asyncFunction changes

  const execute = React.useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);

    // since we are using lambdas
    // all return values will be json
    return asyncFunction()
      .then(response => setValue(response))
      .catch(error => setError(error))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  // call useEffect if we want to execute it immediately
  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
}

export default useAsync;

/**
 *   reference for useEffect with cancellation
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
 */
