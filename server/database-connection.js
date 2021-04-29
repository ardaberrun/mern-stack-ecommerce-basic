const mongoose = require("mongoose");

const URI = process.env.MONGO_URI || "mongodb://localhost/shopDB";

const connectDatabase = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify:false
    })
    .then(() => console.log("db -> ok"))
    .catch((err) => console.log("db -> okn't"));
};

module.exports = connectDatabase;
