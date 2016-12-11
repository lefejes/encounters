angular.module('app').controller('eCharacterListCtrl',
  function($scope, $http, eCharacter, eNotifier) {
    $scope.characters = eCharacter.query();

    $scope.sortOptions = [{ value: "name", text: "Sort by Name"},
      { value: "group", text: "Sort by Group"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

});
