angular.module('app').factory('eIdentity', function($window, eUser) {
  var currentUser;
  if (!!$window.bootstrappedUserObject) {
    currentUser = new eUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    },
    isAuthorized: function(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  };
});
