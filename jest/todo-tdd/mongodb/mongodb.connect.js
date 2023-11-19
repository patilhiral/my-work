const mongoose = require('mongoose')


 async function connect() {
    try {
      await mongoose.connect('add mongo connection here',
        { useNewUrlParser: true }
      );
    } catch (err) {
      console.error("Error connecting to mongodb");
      console.error(err);
    }
  }


  module.exports = { connect };