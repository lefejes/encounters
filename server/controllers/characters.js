var Character = require('mongoose').model('Character');

exports.getCharacters = function(req, res) {
  Character.find({owner: req.user._id}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getCharactersById = function(req, res) {
  Character.findOne({_id: req.params.id, owner: req.user._id}).exec(function(err, character) {
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

exports.updateCharacter = function(req, res) {
  var character = req.body;

  if (req.user._id != character.owner) {
    res.status(403);
    return res.end();
  }

  var query = {'_id': character._id};
  Character.findOneAndUpdate(query, character, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  });
};

exports.deleteCharacter = function(req, res) {

  var character = req.body.character;
  var user = req.body.user

  if (user._id != character.owner) {
    res.status(403);
    return res.end();
  }

  Character.findOneAndRemove(character, function(err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send("succesfully deleted");
  });
};
