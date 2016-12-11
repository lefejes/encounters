angular.module('app').controller('eAddCharacterCtrl',
  function($scope, eCharacter, eNotifier, eIdentity, eHandleCharacter, $location) {
    
    $scope.charTypes = [{ value: "player", text: "Player"},
      { value: "npc", text: "NPC"},
      { value: "enemy", text: "Enemy"}];

    $scope.save = function() {
      var newCharacterData = {
        name: $scope.name,
        charType: $scope.charType,
        group: $scope.group,
        initiativeBonus: $scope.initiativeBonus,
        owner: eIdentity.currentUser._id
      };

      eHandleCharacter.createCharacter(newCharacterData).then(function() {
        eNotifier.notify('New character created!');
        $location.path('/character');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

    $scope.back = function() {
      $location.path('/character');
    }
  });
