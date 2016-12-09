angular.module('app').controller('eProfileCtrl',
  function($scope, eAuth, eIdentity, eNotifier) {
    $scope.email = eIdentity.currentUser.userName;
    $scope.fname = eIdentity.currentUser.firstName;
    $scope.lname = eIdentity.currentUser.lastName;

    $scope.update = function() {
      var newUserData = {
        userName: $scope.email,
        firstName: $scope.fname,
        lastName: $scope.lname
      };

      if ($scope.password && $scope.password.length > 0) {
        newUserData.password = $scope.password;
      }

      eAuth.updateCurrentUser(newUserData).then(function() {
        eNotifier.notify('Your user account has been updated');
      }, function(reason) {
        eNotifier.error(reason);
      });
    };
  });
