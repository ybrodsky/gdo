gdoApp.controller('ClientEditCtrl', function($state, $scope, globalVariables, $stateParams, moment, Api, Client, $filter, Comun, ClientHelper, $localStorage) {
  $scope.asyncSelected = '';
  $scope.tipos_campos = globalVariables.tipos_campos;

  Client.get({
    id: $stateParams.id
  }).$promise.then(function(client) {
    $scope.client = client;
    if(!$scope.client.informacion_adicional)
      $scope.client.informacion_adicional = [];

    if($scope.client.ciudad_id) {
      Api.ycix({
        where: {IZCIUDAD: $scope.client.ciudad_id}
      }).$promise.then(function(res) {
        $scope.asyncSelected2 = res[0].NOMBRE.trim();
      });
    }
  });

  $scope.create = function() {
    if(!$scope.client.cuil)
      delete $scope.client.cuil;

    Client.update({
      id: $stateParams.id
    }, $scope.client).$promise.then(function(res) {
      Comun.toaster('success', 'Cliente', 'El cliente fue editado con éxito');
      $state.go('app.clientIndex', {id: $stateParams.id});
    });
  };

  $scope.calcularCuil = function() {
    if($scope.client.dni && $scope.client.gender && $scope.client.dni.length == 8 && $scope.client.nacionalidad.value == 41) {
      $scope.client.cuil = ClientHelper.calcularCuil($scope.client.dni, $scope.client.gender);
    }
  };

  $scope.getYcix = function(name) {
    return Api.ycix({
      where: {
        NOMBRE: {'like': name + '%'},
        PROVINCIA: {'!': null},
        IZPAIS: {'!': null}
      }
    }).$promise.then(function(response) {
      return response;
    });
  }

  $scope.selected = function(selected) {
    $scope.client.ciudad_id = selected.IZCIUDAD;
    $scope.client.provincia_id = selected.PROVINCIA;
    $scope.client.pais_id = selected.IZPAIS;
  }
});