gdoApp.controller('ProductIndexCtrl', function($scope, Comun, $state, Filter, Product, Category) {
  Category.query().$promise.then((res) => {
    $scope.categories = res;
  });

  $scope.filtros = {
    name: null,
    category_id: null
  }

  $scope.page = function(_page) {

    var query = {
      skip: 20 * (_page - 1),
      limit: 20,
      include: [{model: 'Category'}],
      where: {
        active: true
      }
    };

    query = Filter.get(query, $scope.filtros, Object.keys($scope.filtros));

    Product.query(query, function(results, header) {
      $scope.results = results;
      $scope.totalUsers = header('X-Total-Count');
    });

  };
  $scope.page(1);

  $scope.delete = function(id) {
    Product.update({id: id}, {active: false}).$promise.then(function() {
      $scope.page(1);
      Comun.toaster('success', 'GDO', 'El producto fue eliminado');
    })
  }
});