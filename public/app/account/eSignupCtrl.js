angular.module('app').controller('eSignupCtrl',
  function($scope, eUser, eNotifier, $location, eAuth) {

  $scope.signup = function() {
    var newUserData = {
      userName: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    eAuth.createUser(newUserData).then(function() {
      eNotifier.notify('User account created!');
      $location.path('/');
    }, function(reason) {
      eNotifier.error(reason);
    });
  };
});
