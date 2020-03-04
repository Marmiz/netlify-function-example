import faunadb, { query as q } from "faunadb";

exports.handler = async event => {
  const subject = event.queryStringParameters.q || "all_customers";

  const client = new faunadb.Client({
    secret: `${process.env.DB_TEST_CLIENT}`
  });

  return client
    .query(
      q.Map(
        q.Paginate(q.Match((q.Index(subject)))),
        q.Lambda("X", q.Get(q.Var("X")))
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
