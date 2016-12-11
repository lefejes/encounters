angular.module('app').controller('eEncounterListCtrl',
  function($scope, $http, eEncounter, eNotifier) {
    $scope.encounters = eEncounter.query();

    $scope.sortOptions = [{ value: "title", text: "Sort by Title"},
      { value: "group", text: "Sort by Group"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

});
