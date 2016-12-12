angular.module('app').controller('eAddEncounterCtrl',
  function($scope, eEncounter, eNotifier, eIdentity, eHandleEncounter, eCharacter, $location) {
    $scope.characters = eCharacter.query();

    $scope.sortOptions = [{ value: "name", text: "Sort by Name"},
      { value: "group", text: "Sort by Group"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.added = [];
    $scope.tracking = {};

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

    $scope.save = function() {
      var newEncounterData = {
        title: $scope.title,
        group: $scope.group,
        characters: $scope.added,
        owner: eIdentity.currentUser._id
      };

      eHandleEncounter.createEncounter(newEncounterData).then(function() {
        eNotifier.notify('New encounter created!');
        $location.path('/encounter');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

    $scope.back = function() {
      $location.path('/encounter');
    }


  });
