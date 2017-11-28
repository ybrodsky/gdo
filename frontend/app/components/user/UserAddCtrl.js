gdoApp.controller('UserAddCtrl', function($scope, globalVariables, User, Comun, $uibModal, $localStorage, $state, UnidadesNegocio, Rol) {
  $scope.user = {
    dashboard: [],
    active: true,
    habilitar_correo: false
  }

  UnidadesNegocio.query({}, function(res) {
    $scope.unidades = res;
  });

  Rol.query({}, function(res) {
    $scope.roles = res;
  });

  $scope.create = function() {
    angular.forEach($scope.user.dashboard, function(i, key) {
      $scope.user.dashboard[key].view = true;
      $scope.user.dashboard[key].name = i.id.charAt(0).toUpperCase() + i.id.slice(1);
    });

    var user = new User($scope.user);
    user.$save().then(function(res) {
      Comun.toaster('success', 'Usuario', 'El usuario fue creado con éxito');
      $state.go('app.userIndex');
    }, function(error) {
      //console.log(error.data.error);
    });
  };

  $scope.buscar = function() {
    if(!form.email.$error && $scope.user.email) {
      User.query({
        where: {
          email: $scope.user.email
        }
      }).$promise.then(function(res) { //console.log(res);
        if(res.length) {
          form.email.$error;
          $scope.email_duplicado = true;
        }else {
          $scope.email_duplicado = false;
        }
      });
    }
  };

  $scope.open = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'user/firma_modal.html',
      controller: 'UserFirmaModalCtrl',
      size: 'lg',
      resolve: {
        user: function() {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(function (data) {
      if(data != '') {
        $scope.user.firma = data;
      }

    }, function () {});
  };
});