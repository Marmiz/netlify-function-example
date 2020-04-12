/*
  Call(
    Function("test_training"),
    "257509261693682185",
    {
      trainingId: "259509729140670977",
      extras: [{
        extraId: "259512350637294089",
        quantity: 2
      }],
    },
    "2020-03-17T09:10:06.870Z"
  )
*/

import faunadb, { query as q } from "faunadb";

exports.handler = async event => {
  const client = new faunadb.Client({
    secret: `${process.env.DB_TEST_CLIENT}`
  });

  const date = new Date("2020-03-03");
  const isoDate = date.toISOString();
  return client
  .query(q.Call(
    q.Function("test_training"),
    "257509261693682185",
    {
      "name": "Test"
    },
    isoDate
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
