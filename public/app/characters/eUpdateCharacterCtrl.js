angular.module('app').controller('eUpdateCharacterCtrl',
  function($scope, eNotifier, eHandleCharacter, eCharacter, $routeParams, $location) {

    $scope.charTypes = [{ value: "player", text: "Player"},
      { value: "npc", text: "NPC"},
      { value: "enemy", text: "Enemy"}];

    eCharacter.query().$promise.then(function(collection) {
      collection.forEach(function(character) {
        if (character._id === $routeParams.id) {
          $scope.character = character;
        }
      });
    });

    $scope.save = function() {
      eHandleCharacter.update($scope.character).then(function() {
        eNotifier.notify('Your character has been updated');
        $location.path('/character');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

    $scope.delete = function() {
      eHandleCharacter.delete($scope.character).then(function() {
        eNotifier.notify('Your character has been deleted');
        $location.path('/character');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

    $scope.back = function() {
      $location.path('/character');
    };

  });
