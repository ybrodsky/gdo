gdoApp.controller('UserAddCtrl', function($scope, globalVariables, User, Comun, $uibModal, $localStorage, $state) {
  $scope.user = {
    dashboard: [],
    active: true,
    habilitar_correo: false
  }

  $scope.create = function() {
    var user = new User($scope.user);
    user.$save().then(function(res) {
      Comun.toaster('success', 'Usuario', 'El usuario fue creado con éxito');
      $state.go('app.userIndex');
    }, function(error) {
      //console.log(error.data.error);
    });
  };
});