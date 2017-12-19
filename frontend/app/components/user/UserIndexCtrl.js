gdoApp.controller('UserIndexCtrl', function($scope, $state, Filter, User, Comun) {
  $scope.filtros = {
    name: null,
    surname: null
  };

  $scope.filtros = Filter.load($scope.filtros, 'userIndex');

  $scope.page = function(_page) {
    Filter.save($scope.filtros, 'userIndex');

    var query = {
      skip: 20 * (_page - 1),
      limit: 20,
      attributes: {exclude: ['password']},
      where: {}
    };
    query = Filter.get(query, $scope.filtros, Object.keys($scope.filtros));

    User.query(query, function(users, header) {
      $scope.users = users;
      $scope.totalUsers = header('X-Total-Count');
    });

  };
  $scope.page(1);
});