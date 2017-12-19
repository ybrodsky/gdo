gdoApp.controller('AuthLoginCtrl', function($scope, $rootScope, Auth, Comun, $state, $localStorage) {

  $scope.login = function() {
  	Auth.login($scope.auth).$promise.then(function(response) {
      if(response.token) {
        $localStorage.token = response.token;

      	$state.go('app.dashboard', {}, {reload: true});
      }else {
      	Comun.toaster('error', 'Login', 'Nombre de usuario y/o contraseña incorrectos');
      }
    });
  };
});