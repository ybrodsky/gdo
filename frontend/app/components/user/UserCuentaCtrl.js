gdoApp.controller('UserCuentaCtrl', function($scope, globalVariables, User, Comun, $localStorage, $stateParams, $state, UnidadesNegocio, Rol) {
  $scope.sounds = globalVariables.sounds;
  $scope.settings = {displayProp: 'name', showCheckAll: false, showUncheckAll: false};
  $scope.selectData = [];
  $scope.user = {
    dashboard: []
  };
  $scope.etiqueta = {};

  User.get({id: $localStorage.user.id}).$promise.then(function(user) {
    $scope.user = user;
  });

  $scope.update = function() {

    User.cuenta({id: $scope.user.id}, {
      name: $scope.user.name,
      surname: $scope.user.surname,
      phone: $scope.user.phone,
      intern: $scope.user.intern,
      sound: $scope.user.sound,
      etiquetas: $scope.user.etiquetas,
      aceptar_consultas: $scope.user.aceptar_consultas
    }).$promise.then(function(res) {
      $localStorage.user.name = res.name;
      $localStorage.user.surname = res.surname;
      $localStorage.user.phone = res.phone;
      $localStorage.user.sound = res.sound;
      $localStorage.user.etiquetas = res.etiquetas;
      Comun.toaster('success', 'Cuenta', 'El usuario fue actualizado con éxito');
      $state.go('app.index');
    });
  };

  $scope.crearEtiqueta = function() {
    if($scope.etiqueta.padre) {
      var index = _.findIndex($scope.user.etiquetas, {text: $scope.etiqueta.padre});
      if(!$scope.user.etiquetas[index].children) {
        $scope.user.etiquetas[index].children = [];
      }
      $scope.user.etiquetas[index].children.push({text: $scope.etiqueta.text});
    }else {
      $scope.user.etiquetas.push({text: $scope.etiqueta.text});
    }

    $scope.etiqueta = {};
  };

  $scope.eliminarEtiqueta = function(index) {
    $scope.user.etiquetas.splice(index, 1);
  };
});