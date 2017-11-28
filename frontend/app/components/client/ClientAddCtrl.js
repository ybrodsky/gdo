gdoApp.controller('ClientAddCtrl', function($state, moment, globalVariables, $scope, $stateParams, Api, Client, Comun, ClientHelper) {
  $scope.client = {
    informacion_adicional: []
  };
  $scope.asyncSelected = '';
  $scope.tipos_campos = globalVariables.tipos_campos;

  $scope.create = function() {
    var client = new Client($scope.client);
    client.$save().then(function(res) {
      Comun.toaster('success', 'Cliente', 'El cliente fue agregado con éxito');
      $state.go('app.clientIndex', {id: res.id});
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