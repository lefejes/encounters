var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  name: {type: String, required: '{PATH} is required!'},
  charType: {type: String, required: '{PATH} is required!'},
  group: {type: String, required: '{PATH} is required!'},
  initiativeBonus: {type: Number, required: '{PATH} is required!'},
  owner: {type: String, required: '{PATH} is required!'}
});

var Character = mongoose.model('Character', characterSchema);

exports.schema = characterSchema;
