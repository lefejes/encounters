angular.module('app').controller('eAddCharacterCtrl',
  function($scope, eCharacter, eNotifier, eIdentity, eHandleCharacter, $location) {

    $scope.addNew = function() {
      var newCharacterData = {
        name: $scope.name,
        charType: $scope.charType,
        group: $scope.group,
        initiativeBonus: $scope.initiativeBonus,
        owner: eIdentity.currentUser._id
      };


      eHandleCharacter.createCharacter(newCharacterData).then(function() {
        eNotifier.notify('New character created!');
        $('#addNew').modal('hide');
        $location.path('/character');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };
  });
