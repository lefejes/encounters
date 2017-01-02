angular.module('app').controller('eCharacterListCtrl',
  function($scope, $http, eCharacter, eNotifier, eIdentity, eHandleCharacter, $uibModal) {
    $scope.characters = eCharacter.query();

    $scope.sortOptions = [{ value: "name", text: "Sort by Name"},
      { value: "group", text: "Sort by Group"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

    $scope.createCharacter = function() {
      var modalInstance = $uibModal.open({
        controller: function($uibModalInstance) {
          this.charTypes = [{ value: "player", text: "Player"},
            { value: "npc", text: "NPC"},
            { value: "enemy", text: "Enemy"}];
          this.cancel = function() {
            $uibModalInstance.dismiss("Cancel");
          }
        },
        templateUrl: "../../app/characters/templates/add-character.html",
        controllerAs: "model"
      });

      modalInstance.result.then(function(result, err) {
        var newCharacterData = {
          name: result.name,
          charType: result.charType,
          group: result.group,
          initiativeBonus: result.initiativeBonus,
          owner: eIdentity.currentUser._id
        };

        eHandleCharacter.createCharacter(newCharacterData).then(function() {
          eNotifier.notify('New character created!');
          $scope.characters = eCharacter.query();
        }, function(reason) {
          eNotifier.error(reason);
        });
      });
    };

    $scope.updateCharacter = function(character) {
      var modalInstance = $uibModal.open({
        controller: function($uibModalInstance) {
          this.charTypes = [{ value: "player", text: "Player"},
            { value: "npc", text: "NPC"},
            { value: "enemy", text: "Enemy"}];
          this.cancel = function() {
            $uibModalInstance.dismiss("Cancel");
          };
          this.character = character;

          this.delete = function(character) {
            eHandleCharacter.delete(character).then(function() {
              eNotifier.notify('Your character has been deleted');
              $scope.characters = eCharacter.query();
              $uibModalInstance.dismiss("Deleted");
            }, function(reason) {
              eNotifier.error(reason);
            });
          };
        },
        templateUrl: "../../app/characters/templates/update-character.html",
        controllerAs: "model"
      });

      modalInstance.result.then(function(result, err) {
        eHandleCharacter.update(result).then(function() {
          eNotifier.notify('Your character has been updated');
          $scope.characters = eCharacter.query();
        }, function(reason) {
          eNotifier.error(reason);
        });
      });
    }
});
