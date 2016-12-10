angular.module('app').controller('eUpdateCharacterCtrl',
  function($scope, eIdentity, eNotifier, eHandleCharacter, $routeParams) {
    $scope.name = $routeParams.name;
    $scope.charType = $routeParams.charType;
    $scope.group = $routeParams.group;
    $scope.initiativeBonus = $routeParams.initiativeBonus;

    $scope.update = function() {
      var characterData = {
        name: $scope.name,
        charType: $scope.charType,
        group: $scope.group,
        initiativeBonus: $scope.initiativeBonus,
        owner: eIdentity.currentUser._id
      };

      eHandleCharacter.updateCharacter(characterData).then(function() {
        eNotifier.notify('Your character has been updated');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

    $scope.delete = function() {
      eHandleCharacter.delete({_id: $routeParams._id}).then(function() {
        eNotifier.notify('Your character has been updated');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };

  });
