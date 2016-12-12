angular.module('app').controller('eUpdateEncounterCtrl',
  function($scope, eNotifier, eHandleEncounter, eEncounter, eCharacter, $routeParams, $location) {
    $scope.characters = eCharacter.query();

    eEncounter.query().$promise.then(function(collection) {
      collection.forEach(function(encounter) {
        if (encounter._id === $routeParams.id) {
          $scope.encounter = encounter;
          $scope.added = encounter.characters;
          $scope.tracking = encounter.characters.reduce(function(tracking, char) {
              var name = char.name.split(' ')[0];
              if (!tracking[name]) {
                tracking[name] = 1;
              } else {
                tracking[name]++;
              }
              return tracking;
          }, {});
        }
      });
    });

    $scope.save = function() {
      eHandleEncounter.update($scope.encounter).then(function() {
        eNotifier.notify('Your encounter has been updated');
        $location.path('/encounter');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

    $scope.delete = function() {
      eHandleEncounter.delete($scope.encounter).then(function() {
        eNotifier.notify('Your encounter has been deleted');
        $location.path('/encounter');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

    $scope.back = function() {
      $location.path('/encounter');
    };

    $scope.add = function(character) {
      var clone = angular.copy(character);
      delete clone._id;
      if (!$scope.tracking[clone.name]) {
        $scope.tracking[clone.name] = 1;
        $scope.added.push(clone);
      } else {
        if ($scope.tracking[clone.name] === 1) {
          var idx = $scope.added.findIndex(char => char.name === clone.name);
          $scope.added[idx].name += " (1)";
        }
        $scope.tracking[clone.name]++;
        clone.name += " ("+ $scope.tracking[character.name] +")";
        $scope.added.push(clone);
      }
    }

    $scope.remove = function(character) {
      var name = character.name.split(' ')[0];
      $scope.tracking[name]--;
      if ($scope.tracking[name] === 0) {
        delete $scope.tracking[name];
      }
      var idx = $scope.added.indexOf(character);
      $scope.added.splice(idx, 1);
    }

  });
