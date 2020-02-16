import faunadb, { query as q } from "faunadb";

var client = new faunadb.Client({
  secret: `${process.env.DB_TEST_CLIENT}`
});

exports.handler = async event => {
  const subject = event.queryStringParameters.name || "World";

  return client
    .query(q.Get(q.Ref(q.Collection("customers"), "257509261693682185")))
    .then(response => {
      console.log("success", response);
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    })
    .catch(error => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      };
    });
};
