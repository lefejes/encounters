angular.module('app').factory('eHandleEncounter', function($http, $q, eEncounter, eIdentity) {
  return {
      createEncounter: function(newEncounterData) {
        var newEncounter = new eEncounter(newEncounterData);
        var dfd = $q.defer();

        newEncounter.$save().then(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });
        return dfd.promise;
      },

      update: function(encounter) {
        var dfd = $q.defer();

        encounter.$update().then(function() {
          dfd.resolve();
        }, function(response) {
          dfd.reject(response.data.reason);
        });

        return dfd.promise;
      },

      delete: function(encounter) {
        var dfd = $q.defer();
        $http({
          url: '/api/encounter',
          method: 'DELETE',
          data: {
            encounter: encounter,
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
