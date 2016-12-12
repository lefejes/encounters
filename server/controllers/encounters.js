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

exports.updateEncounter = function(req, res) {
  var encounter = req.body;

  if (req.user._id != encounter.owner) {
    res.status(403);
    return res.end();
  }

  var query = {'_id': encounter._id};
  Encounter.findOneAndUpdate(query, encounter, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  });
};

exports.deleteEncounter = function(req, res) {

  var encounter = req.body.encounter;
  var user = req.body.user

  if (user._id != encounter.owner) {
    res.status(403);
    return res.end();
  }
  var query = {'_id': encounter._id};
  Encounter.findOneAndRemove(query, function(err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send("succesfully deleted");
  });
};
