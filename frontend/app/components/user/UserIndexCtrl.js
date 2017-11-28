gdoApp.controller('UserIndexCtrl', function($scope, $state, Filter, User, Comun, UnidadesNegocio, Rol) {
  $scope.filtros = {
    name: null,
    surname: null,
    email: null,
    active: "0",
    aceptar_consultas: "0",
    rol_id: null,
    unidad_negocio_id: null,
    deleted: "1"
  };

  $scope.filtros = Filter.load($scope.filtros, 'userIndex');

  $scope.page = function(_page) {
    Filter.save($scope.filtros, 'userIndex');

    var query = {
      skip: 20 * (_page - 1),
      limit: 20,
      populate: [{model: 'rol'}, {model: 'unidadnegocio'}],
      attributes: ['id', 'name', 'surname', 'email', 'phone', 'intern', 'aceptar_consultas', 'active'],
      where: {}
    };
    query = Filter.get(query, $scope.filtros, Object.keys($scope.filtros));

    User.query(query, function(users, header) {
      $scope.users = users;
      $scope.totalUsers = header('X-Total-Count');
    });

  };
  $scope.page(1);

  $scope.delete = function(user) {
    User.delete({id: user.id}).$promise.then(function() {
      Comun.toaster('success', 'Usuario', 'El usuario fue borrado');
      $scope.page(1);
    });
  };

  UnidadesNegocio.query({sort: 'nombre ASC'}, function(res) {
    $scope.unidades = res;
  });

  Rol.query({sort: 'nombre ASC'}, function(res) {
    $scope.roles = res;
  });
});