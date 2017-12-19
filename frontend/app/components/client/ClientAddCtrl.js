gdoApp.controller('ClientAddCtrl', function($state, moment, globalVariables, $scope, $stateParams, Client, Comun) {
  $scope.client = {
    active: true
  };

  $scope.create = function() {
    var client = new Client($scope.client);
    client.$save().then(function(res) {
      Comun.toaster('success', 'Cliente', 'El cliente fue agregado con éxito');
      $state.go('app.clientsIndex', {id: res.id});
    });
  };

});