gdoApp.controller('CategoryAddCtrl', function($scope, globalVariables, Category, Comun, $uibModal, $localStorage, $state) {
  $scope.category = {

  }

  $scope.create = function() {
    var category = new Category($scope.category);
    category.$save().then(function(res) {
      Comun.toaster('success', 'Categoria', 'La categoria fue creada con éxito');
      $state.go('app.categoryIndex');
    });
  };
});