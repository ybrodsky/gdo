gdoApp.controller('AuthLogoutCtrl', function($scope, $location, globalVariables, Auth, Comun, $state, $localStorage) {
	delete $localStorage.user;
  delete $localStorage.token;

  $state.go('login');
});