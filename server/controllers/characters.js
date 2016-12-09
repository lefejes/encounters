var Character = require('mongoose').model('Character');

exports.getCharacters = function(req, res) {
  Character.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getCharactersById = function(req, res) {
  Character.findOne({_id: req.params.id}).exec(function(err, character) {
    res.send(character);
  });
};
