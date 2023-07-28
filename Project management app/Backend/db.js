const mongoose = require('mongoose');

const connectToMongo = () => {
  try {
    mongoose.connect('mongodb+srv://prahladgaur0711:Prahlad0711@cluster0.rzcxx5t.mongodb.net/iNoteBook', {
    });
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}



module.exports = connectToMongo;