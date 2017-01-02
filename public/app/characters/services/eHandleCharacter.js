angular.module('app').factory('eHandleCharacter', function($http, $q, eCharacter, eIdentity) {
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

      update: function(character) {
        var dfd = $q.defer();

        character.$update().then(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });

        return dfd.promise;
      },

      delete: function(character) {
        var dfd = $q.defer();
        $http({
          url: '/api/character',
          method: 'DELETE',
          data: {
            character: character,
            user: eIdentity.currentUser
          },
          headers: {
            "Content-Type": "application/json;charset=utf-8"
          }
        }).then(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      }

  };
});
