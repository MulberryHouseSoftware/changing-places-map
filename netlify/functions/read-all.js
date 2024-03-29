const faunadb = require("faunadb");
const q = faunadb.query;

exports.handler = async function (event, context) {
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET,
  });

  return client
    .query(
      q.Paginate(q.Match(q.Ref("indexes/all_changing_places")), {
        size: 10_000,
      })
    )
    .then((response) => {
      const changingPlaceRefs = response.data;

      console.log(`${changingPlaceRefs.length} changing places found`);

      const getAllChangingPlaceDataQuery = changingPlaceRefs.map((ref) => {
        return q.Get(ref);
      });

      return client.query(getAllChangingPlaceDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret),
        };
      });
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
