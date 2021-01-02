const MongoClient = require("mongodb").MongoClient;

const pool = async () => {
  try {
    return (await MongoClient.connect("mongodb://localhost:27017/")).db(
      "ecommerce"
    );
  } catch (err) {
    console.log(err.stack);
  }
};
module.exports = { pool };
