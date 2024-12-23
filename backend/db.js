const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://sachinsamprit:n2SMYK3TJLCIQt7j@cluster0.t5kyo.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
