const mongoose = require('mongoose');
require('dotenv').config();  

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;  
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in .env file');
    }

    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
