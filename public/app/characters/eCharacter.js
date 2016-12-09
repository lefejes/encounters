angular.module('app').factory('eCharacter', function($resource) {
  var CharacterResource = $resource('/api/character/:_id', {_id: "@id"}, {
    update: { method: 'PUT', isArray: false }
  });

  return CharacterResource;
});
