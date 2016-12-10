angular.module('app').factory('eHandleCharacter', function($http, $q, eCharacter) {
  return {
      createCharacter: function(newCharacterData) {
        var newCharacter = new eCharacter(newCharacterData);
        var dfd = $q.defer();

        newCharacter.$save().then(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },

      deleteCharacter: function(id) {
        var dfd = $q.defer();
        var character = new eCharacter(id);
        character.$delete().then(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }
  };
});
