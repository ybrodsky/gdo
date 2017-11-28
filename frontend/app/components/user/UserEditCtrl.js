gdoApp.controller('UserEditCtrl', function($scope, globalVariables, User, Comun, $uibModal, $localStorage, $stateParams, $state, UnidadesNegocio, Rol, Inbox) {
  $scope.user = {
    dashboard: []
  }

  $scope.filters = {
    oportunity_id: false,
    etiqueta: false,
    etiquetaE: ''
  }

  User.get({id: $stateParams.id}).$promise.then(function(user) {
    $scope.user = user;
    $scope.user.roles = user.roles ? user.roles.id : null;
    $scope.user.unidades_negocios = user.unidades_negocios ? user.unidades_negocios.id : null;
    $scope.user.dashboard = $scope.user.dashboard ? $scope.user.dashboard : [];
    delete $scope.user.email_password;
  });

  UnidadesNegocio.query({}, function(res) {
    $scope.unidades = res;
  });

  Rol.query({}, function(res) {
    $scope.roles = res;
  });

  $scope.clean = function() {
    let query = {
      where: {
        user_id: $stateParams.id,
        oportunity_id: null,
        etiqueta: null
      }
    }

    if($scope.filters.oportunity_id) {
      delete query.where.oportunity_id;
    }

    if($scope.filters.etiqueta) {
      delete query.where.etiqueta;
    }

    if($scope.filters.etiquetaE) {
      query.where.etiqueta = $scope.filters.etiquetaE;
    }

    Inbox.clean(query).$promise.then((res) => {
      Comun.toaster('success', 'Usuario', `Se eliminaron ${res.deleted} correos`);
    })
  }

  $scope.update = function() {
    if(!$scope.user.password)
      delete $scope.user.password;

    if(!$scope.user.email_password)
      delete $scope.user.email_password;

    User.update({id: $scope.user.id}, $scope.user).$promise.then(function(res) {
      Comun.toaster('success', 'Usuario', 'El usuario fue actualizado con éxito');
      $state.go('app.userIndex');
    });
  };

  $scope.buscar = function() {
    if(!form.email.$error && $scope.user.email) {
      User.query({
        where: {
          email: $scope.user.email
        }
      }).$promise.then(function(res) { //console.log(res);
        if(res.length && res[0].id != $scope.user.id) {
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