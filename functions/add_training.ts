/*
Call(
  Function("submit_order"),
    "1",
    [
      Object({
        "productId": "1",
        "quantity": 10
      }),
      Object({
        "productId": "2",
        "quantity": 5
      }),
      Object({
        "productId": "3",
        "quantity": 20
      })
    ]
);
*/

import faunadb, { query as q } from "faunadb";

exports.handler = async event => {
  const client = new faunadb.Client({
    secret: `${process.env.DB_TEST_CLIENT}`
  });

  return client
  .query(q.Call(
    q.Function("submit_training"),
    "257509261693682185",
    [{
        "productId": "259509729140670977",
        "quantity": 3
      },
    ]
  ))
    .then(response => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    })
    .catch(error => {
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
