gdoApp.controller('ProductAddCtrl', function($scope, globalVariables, Category, Product, Comun, $uibModal, $localStorage, $state) {
  $scope.product = {
  	net: 0,
  	price: 0
  }

  Category.query({
    where: {active: true}
  }).$promise.then((res) => {
    $scope.categories = res;
  });

  $scope.create = function() {
    var product = new Product($scope.product);
    product.$save().then(function(res) {
      Comun.toaster('success', 'Producto', 'El producto fue creado con éxito');
      $state.go('app.productIndex');
    });
  };
});