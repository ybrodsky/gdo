gdoApp.controller('ClientEditCtrl', function($state, $scope, globalVariables, $stateParams, moment, Client, $filter, Comun, $localStorage) {
  $scope.asyncSelected = '';
  $scope.tipos_campos = globalVariables.tipos_campos;

  Client.get({
    id: $stateParams.id
  }).$promise.then(function(client) {
    $scope.client = client;
  });

  $scope.create = function() {
    if(!$scope.client.cuil)
      delete $scope.client.cuil;

    Client.update({
      id: $stateParams.id
    }, $scope.client).$promise.then(function(res) {
      Comun.toaster('success', 'Cliente', 'El cliente fue editado con éxito');
      $state.go('app.clientsIndex', {id: $stateParams.id});
    });
  };
});