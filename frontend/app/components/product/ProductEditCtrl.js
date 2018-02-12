gdoApp.controller('ProductEditCtrl', function($scope, globalVariables, Category, Product, Comun, $uibModal, $localStorage, $stateParams, $state) {

  Category.query({
    where: {active: true}
  }).$promise.then((res) => {
    $scope.categories = res;
  });

  Product.get({id: $stateParams.id}).$promise.then(function(product) {
    $scope.product = product;
  });

  $scope.update = function() {
    Product.update({id: $scope.product.id}, $scope.product).$promise.then(function(res) {
      Comun.toaster('success', 'Producto', 'El producto fue actualizado con éxito');
      $state.go('app.productIndex');
    });
  };
});