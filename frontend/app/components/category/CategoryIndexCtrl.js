gdoApp.controller('CategoryIndexCtrl', function($scope, $state, Filter, Category) {

  $scope.page = function(_page) {

    var query = {
      skip: 20 * (_page - 1),
      limit: 20
    };

    Category.query(query, function(results, header) {
      $scope.results = results;
      $scope.totalUsers = header('X-Total-Count');
    });

  };
  $scope.page(1);
});