const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb://mongo-db/SecureLogix", connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect database!");
  }
};

module.exports = connectDB;
