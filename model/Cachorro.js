const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cachorro = new Schema({
  nome_animal: {
    type: String
  },
  raça: {
    type: String
  },
  peso: {
    type: String
  },
  picture: {
    type: String
  }
},{
    collection: 'cachorro'
});

module.exports = mongoose.model('Cachorro', Cachorro);