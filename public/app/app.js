angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: { auth: function(eAuth) {
        return eAuth.authorizeCurrentUserForRoute('admin');
      }},
    user: { auth: function(eAuth) {
      return eAuth.authorizeAuthenticatedUserForRoute();
    }}
  };

  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', { templateUrl: '/partials/main/main', controller: 'mainCtrl' })
    .when('/admin/users', {
      templateUrl: '/partials/admin/user-list', controller: 'eUserListCtrl',
      resolve: routeRoleChecks.admin
    })
    .when('/signup', { templateUrl: '/partials/account/signup',
      controller: 'eSignupCtrl' })
    .when('/profile', { templateUrl: '/partials/account/profile',
      controller: 'eProfileCtrl', resolve: routeRoleChecks.user });
});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, prev, rej) {
    if (rej == 'not authorized') { $location.path('/'); }
  });
});
