gdoApp.controller('ClientCuentaCtrl', function($state, $scope, globalVariables, $stateParams, moment, Sale, Client, $filter, Comun, $localStorage) {
  $scope.asyncSelected = '';
  $scope.tipos_campos = globalVariables.tipos_campos;

  Client.get({
    id: $stateParams.id
  }).$promise.then(function(client) {
    $scope.client = client;
  });

  Sale.query({
    where: {
      client_id: $stateParams.id,
      paid: 0
    },
    include: [{model: 'Product'}]
  }).$promise.then((res) => {
    $scope.sales = res;
  })

  $scope.ids = [];
  $scope.total = 0;

  $scope.select = (sale) => {
    if(sale.selected) {
      $scope.ids.push(sale.id);
      $scope.total += sale.total;
    }else {
      $scope.ids.splice($scope.ids.indexOf(sale.id), 1);
      $scope.total -= sale.total;
    }
  }

  $scope.pay = () => {
    Sale.payup({
      ids: $scope.ids
    }).$promise.then(() => {
      Comun.toaster('success', 'Cuenta', 'Los items fueron saldados');
      $state.go('app.clientCuenta', {id: $stateParams.id}, {reload: true});
    });
  }
});