angular.module('app').controller('eUserListCtrl',
  function($scope, eUser) {
    $scope.users = eUser.query();
  });
