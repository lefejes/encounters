angular.module('app').factory('eAuth', function($http, eIdentity, $q, eUser) {
  return {
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username: username, password: password})
        .then(function(response) {
          if (response.data.success) {
            var user = new eUser();
            angular.extend(user, response.data.user);
            eIdentity.currentUser = user;
            dfd.resolve(true);
          } else {
            dfd.resolve(false);
          }
        });
      return dfd.promise;
    },
    createUser: function(newUserData) {
      var newUser = new eUser(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function() {
        eIdentity.currentUser = newUser;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },
    updateCurrentUser: function(newUserData) {
      var dfd = $q.defer();

      var clone = angular.copy(eIdentity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function() {
        eIdentity.currentUser = clone;
        dfd.resolve();
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    },
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post("/logout", {logout: true}).then(function() {
        eIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    },
    authorizeCurrentUserForRoute: function(role) {
      if (eIdentity.isAuthorized(role)) {
            return true;
          } else {
            return $q.reject('not authorized');
          }
    },
    authorizeAuthenticatedUserForRoute: function() {
      if (eIdentity.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  };

});
