angular.module('app').controller('ePlayCtrl',
  function($scope, eEncounter) {
    $scope.encounters = eEncounter.query();

    $scope.encounter = {isSelected: false};

    $scope.selectEncounter = function() {
      $scope.encounter = JSON.parse($scope.selectedEncounter);

      initializeEncounter();
    }

    $scope.close = function() {
      $scope.encounter = {isSelected: false};
    }

    $scope.next = function() {
      $scope.encounter.characters.forEach(char => {
        char.initiative = Math.floor(Math.random() * 20) + 1 + char.initiativeBonus;
      });
      $scope.encounter.round++;
    }

    var initializeEncounter = function() {
      $scope.encounter.round = 0;
      $scope.encounter.isSelected = true;
      $scope.encounter.characters.forEach(char => char.initiative = 0);

    }

  });
