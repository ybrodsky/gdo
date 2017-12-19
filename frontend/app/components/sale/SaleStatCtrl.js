gdoApp.controller('SaleStatCtrl', function($scope, $state, $stateParams, globalVariables, $window, Filter, Sale, Client) {
  $scope.filters = {
    createdAt: {
      from: new Date(),
      to: new Date()
    }
  };

  $scope.fetch = function() {
    $window.open(
      `${globalVariables.url}/report/${moment($scope.filters.createdAt.from).format('YYYY-MM-DD')}/${moment($scope.filters.createdAt.to).format('YYYY-MM-DD')}`,
      '_blank'
    );
  };
});