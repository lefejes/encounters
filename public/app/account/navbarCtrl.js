angular.module('app').controller('navbarCtrl',
  function($scope, $http, eIdentity) {
    $scope.identity = eIdentity;
});
