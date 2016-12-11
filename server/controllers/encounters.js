var Encounter = require('mongoose').model('Encounter');

exports.getEncounters = function(req, res) {
  Encounter.find({owner: req.user._id}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getEncountersById = function(req, res) {
  Encounter.findOne({_id: req.params.id, owner: req.user._id}).exec(function(err, encounter) {
    res.send(encounter);
  });
};

exports.createEncounter = function(req, res, next) {
  var encounterData = req.body;
  Encounter.create(encounterData, function(err, encounter) {
    if (err) {
      res.status(400);
      return res.send({reason: err.toString()});
    }

    res.send(encounter);
  });
};
