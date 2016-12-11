var mongoose = require('mongoose'),
    character = require('./Character');

var encounterSchema = mongoose.Schema({
  title: {type: String, required: '{PATH} is required!'},
  group: {type: String, required: '{PATH} is required!'},
  characters: [character.schema],
  owner: {type: String, required: '{PATH} is required!'}
});

var Encounter = mongoose.model('Encounter', encounterSchema);
