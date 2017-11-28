gdoApp.controller('AuthLoginCtrl', function($scope, $rootScope, Auth, Comun, $state, $localStorage) {

  $scope.login = function() {
    $scope.auth.email = $scope.auth.email.split('@').length < 2
      ? $scope.auth.email + '@lesamisviajes.com'
      : $scope.auth.email;

  	Auth.login($scope.auth).$promise.then(function(response) {
      if(response.user) {
      	$localStorage.user = response.user;
      	//Sockets.inbox($localStorage.user.email);

        Comun.setUnseen();
        Comun.setSetting();

      	$state.go('app.dashboard', {}, {reload: true});
      }else {
      	Comun.toaster('error', 'Login', 'Nombre de usuario y/o contraseña incorrectos');
      }
    });
  };
});