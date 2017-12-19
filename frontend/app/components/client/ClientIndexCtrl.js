gdoApp.controller('ClientIndexCtrl', function($scope, $state, $stateParams, globalVariables, Filter, Client) {
  $scope.filtros = {
    name: null,
    surname: null,
    dni: null
  };

  $scope.page = function(_page) {

    var query = {
      skip: 10 * (_page - 1),
      limit: 10,
      where: {}
    };

    query = Filter.get(query, $scope.filtros, Object.keys($scope.filtros));

    Client.query(query, function(clients, header) {
      $scope.clients = clients;
      $scope.totalClients = header('X-Total-Count');
    });
  };
  $scope.page(1);
});