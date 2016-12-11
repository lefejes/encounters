var auth = require('./auth'),
    mongoose = require('mongoose'),
    users = require('../controllers/users'),
    characters = require('../controllers/characters'),
    encounters = require('../controllers/encounters'),
    User = mongoose.model('User');

module.exports = function(app) {

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);

  app.get('/api/character', characters.getCharacters);
  app.get('/api/character/:id', characters.getCharactersById);
  app.post('/api/character', characters.createCharacter);
  app.put('/api/character', characters.updateCharacter);
  app.delete('/api/character', characters.deleteCharacter);

  app.get('/api/encounter', encounters.getEncounters);
  app.get('/api/encounter/:id', encounters.getEncountersById);
  app.post('/api/encounter', encounters.createEncounter);

  app.get('/partials/*', function(req, res) {
    res.render("../../public/app/" + req.params[0]);
  });

  app.post('/login', auth.authenticate);
  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('*', function (req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};
