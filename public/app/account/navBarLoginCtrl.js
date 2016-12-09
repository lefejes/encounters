angular.module('app').controller('navBarLoginCtrl',
  function($scope, $http, eIdentity, eNotifier, eAuth, $location) {
  $scope.identity = eIdentity;
  $scope.signin = function(username, password) {
    eAuth.authenticateUser(username, password)
        .then(function(success) {
          if (success) {
            eNotifier.notify("You have successfully signed in!");
          } else {
            eNotifier.notify('Username/password combination invalid.');
          }
        });
  };

  $scope.signout = function() {
    eAuth.logoutUser().then(function() {
      $scope.username = "";
      $scope.password = "";
      eNotifier.notify("You have successfully logged out!");
      $location.path('/');
    });
  };
});
