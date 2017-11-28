gdoApp.controller('EmitirComponentCtrl', function($scope, $localStorage, moment, $q, $uibModalInstance, component, resource, $injector) {
  $scope.component = component;
  $scope.resource = resource;

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };

  $scope.ok = function () {
    $scope.form.$submitted = true;
    if($scope.form.$valid) {
      var Resource = $injector.get($scope.resource);
      Resource.emitir({id: $scope.component.id, currency: $scope.moneda}).$promise.then(function() {
        $uibModalInstance.close();
      });
    }
  };
});