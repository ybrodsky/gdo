gdoApp.controller('AuthLogoutCtrl', function($scope, $location, globalVariables, Auth, Comun, $state, $localStorage) {
	Auth.logout().$promise.then(function() {
		delete $localStorage.user;
    $state.go('login');
  });
});