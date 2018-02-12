gdoApp.controller('CategoryIndexCtrl', function($scope, $state, Filter, Comun, Category) {

  $scope.page = function(_page) {

    var query = {
      skip: 20 * (_page - 1),
      limit: 20,
      where: {active: true}
    };

    Category.query(query, function(results, header) {
      $scope.results = results;
      $scope.totalUsers = header('X-Total-Count');
    });

  };
  $scope.page(1);

  $scope.delete = function(id) {
    Category.update({id: id}, {active: false}).$promise.then(function() {
      $scope.page(1);
      Comun.toaster('success', 'GDO', 'El producto fue eliminado');
    })
  }
});