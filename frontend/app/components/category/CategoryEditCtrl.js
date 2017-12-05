gdoApp.controller('CategoryEditCtrl', function($scope, globalVariables, Category, Comun, $uibModal, $localStorage, $stateParams, $state) {

  Category.get({id: $stateParams.id}).$promise.then(function(category) {
    $scope.category = category;
  });

  $scope.update = function() {
    Category.update({id: $scope.category.id}, $scope.category).$promise.then(function(res) {
      Comun.toaster('success', 'Categoria', 'La categoria fue actualizada con éxito');
      $state.go('app.categoryIndex');
    });
  };
});