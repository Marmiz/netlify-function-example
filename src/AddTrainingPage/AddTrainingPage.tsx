import * as React from "react";
import { Page, BottomToolbar, ProgressBar } from "react-onsenui";
import NavBar from "../NavBar/index";
import useAsync from "../utils/useAsync";
import { getData } from "../utils/fetch";
import TrainingList from "./TrainingList";
import { ResponseObject } from "../utils/useAsync";
import { Training, Extra } from "./index";
import ExtrasList from "./ExtrasList";
import Recap from "./Recap";

export type TrainingProps = {
  navigator: {
    popPage: () => void;
  };
};

const getAllProducts = getData("all_products");

const extractProductData = (fromApi: ResponseObject | null): Training[] => {
  if (!fromApi) return [];

  return fromApi.data.map(d =>
    Object.assign({}, { name: "", id: "" }, d.data, { id: d.ref["@ref"].id })
  );
};

function AddTraining(props: TrainingProps) {
  // const { pending, value, error } = useAsync(getAllProducts);
  const [extras, addIntoExtras] = React.useState<Extra[]>([]);
  const [training, addIntoTraining] = React.useState<Training | null>(null);

  // mock value --> DEV ONLY
  const [value] = React.useState(mockResponse);
  const error = false;
  const pending = false;

  const addTraining = () => {
    fetch("/.netlify/functions/add_training", {
      body: JSON.stringify({ data: "fake" }),
      method: "POST"
    })
      .then(res => console.log(res))
      .catch(error => console.error(error));
  };

  const onAddTraining = (training: Training): void => {
    addIntoTraining(training);
  };

  const onAddExtras = (extra: { id: string; name: string }): void => {
    const { name, id } = extra;
    const newExtras = [...extras];
    for (let i = 0; i < newExtras.length; i++) {
      if (newExtras[i].id === id) {
        newExtras[i].quantity += 1;
        return addIntoExtras(newExtras);
      }
    }
    return addIntoExtras([...newExtras, { id, name, quantity: 1 }]);
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
        <React.Fragment>
          <TrainingList
            data={extractProductData(value)}
            addTraining={onAddTraining}
          />
          <ExtrasList
            data={extractProductData(value)}
            addExtras={onAddExtras}
          />
          <Recap training={training} extras={extras} />
        </React.Fragment>
      )}
      <button onClick={addTraining}>add training</button>
      <BottomToolbar modifier="aligned">
        <button onClick={() => props.navigator.popPage()}>GoTo Favorite</button>
      </BottomToolbar>
    </Page>
  );
}

export default AddTraining;

const mockResponse = {
  data: [
    {
      ref: {
        "@ref": {
          id: "257509261689487881",
          collection: {
            "@ref": {
              id: "products",
              collection: { "@ref": { id: "collections" } }
            }
          }
        }
      },
      ts: 1584095857730000,
      data: {
        name: "Cup",
        description: "Translucent 9 Oz",
        price: 6.9,
        quantity: 80,
        storehouse: {
          "@ref": {
            id: "257509261686342153",
            collection: {
              "@ref": {
                id: "storehouses",
                collection: { "@ref": { id: "collections" } }
              }
            }
          }
        },
        backorderLimit: 5,
        backordered: false
      }
    },
    {
      ref: {
        "@ref": {
          id: "257509261690536457",
          collection: {
            "@ref": {
              id: "products",
              collection: { "@ref": { id: "collections" } }
            }
          }
        }
      },
      ts: 1584095857730000,
      data: {
        name: "Beef Cheek",
        description: "Fresh",
        price: 5.28,
        quantity: 90,
        storehouse: {
          "@ref": {
            id: "257509261686343177",
            collection: {
              "@ref": {
                id: "storehouses",
                collection: { "@ref": { id: "collections" } }
              }
            }
          }
        },
        backorderLimit: 10,
        backordered: false
      }
    },
    {
      ref: {
        "@ref": {
          id: "257509261690537481",
          collection: {
            "@ref": {
              id: "products",
              collection: { "@ref": { id: "collections" } }
            }
          }
        }
      },
      ts: 1584095857730000,
      data: {
        name: "Pizza",
        description: "Frozen Cheese",
        price: 4.07,
        quantity: 60,
        storehouse: {
          "@ref": {
            id: "257509261683196425",
            collection: {
              "@ref": {
                id: "storehouses",
                collection: { "@ref": { id: "collections" } }
              }
            }
          }
        },
        backorderLimit: 15,
        backordered: false
      }
    },
    {
      ref: {
        "@ref": {
          id: "259509729140670977",
          collection: {
            "@ref": {
              id: "products",
              collection: { "@ref": { id: "collections" } }
            }
          }
        }
      },
      ts: 1584435280130000,
      data: {
        name: "Base Training",
        duration: 90,
        price: 200,
        type: "training"
      }
    },
    {
      ref: {
        "@ref": {
          id: "259509797935645185",
          collection: {
            "@ref": {
              id: "products",
              collection: { "@ref": { id: "collections" } }
            }
          }
        }
      },
      ts: 1584435228650000,
      data: {
        name: "Advanced Training",
        duration: 120,
        cost: 200,
        type: "training"
      }
    },
    {
      ref: {
        "@ref": {
          id: "259512350637294089",
          collection: {
            "@ref": {
              id: "products",
              collection: { "@ref": { id: "collections" } }
            }
          }
        }
      },
      ts: 1584434874120000,
      data: { name: "Water SM", extra: true, price: 20, type: "extra" }
    },
    {
      ref: {
        "@ref": {
          id: "259874920869134850",
          collection: {
            "@ref": {
              id: "products",
              collection: { "@ref": { id: "collections" } }
            }
          }
        }
      },
      ts: 1584094887520000,
      data: { name: "test" }
    }
  ]
};
