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

exports.createCharacter = function(req, res, next) {
  var characterData = req.body;
  Character.create(characterData, function(err, character) {
    if (err) {
      res.status(400);
      return res.send({reason: err.toString()});
    }

    res.send(character);
  });
};
