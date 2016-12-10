angular.module('app').controller('eCharacterListCtrl',
    $scope.characters = eCharacter.query();

    $scope.sortOptions = [{ value: "name", text: "Sort by Name"},
      { value: "group", text: "Sort by Group"}];


    $scope.charTypes = [{ value: "player", text: "Player"},
      { value: "npc", text: "NPC"},
      { value: "enemy", text: "Enemy"}];

    $scope.sortOrder = $scope.sortOptions[0].value;

});
