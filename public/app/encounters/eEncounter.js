angular.module('app').factory('eEncounter', function($resource) {
  var EncounterResource = $resource('/api/encounter/:_id', {_id: "@id"}, {
    update: { method: 'PUT', isArray: false }
  });

  return EncounterResource;
});
