gdoApp.controller('EditComponentCtrl', function($scope, $localStorage, moment, $uibModalInstance, ComponentHelper, gasto_gestion, component, Iva, Api, tipo, $injector) {

	$scope.component = component;
	$scope.tipo = tipo;
  $scope.desglose = {};
  $scope.multiplicador = $scope.component.noches || $scope.component.dias_viaje || 0;
  $scope.component.fantasia = $scope.component.precio_neto * $scope.multiplicador;
  $scope.component.fantasia_impuesto = $scope.component.impuesto * $scope.multiplicador;
  $scope.gasto_gestion = gasto_gestion;

  function agustinMarica() {
    $scope.component.iva_neto = ComponentHelper.calcularIva($scope.component, {gasto_gestion: $scope.gasto_gestion}).neto;
    $scope.component.pagar_bsp = $scope.component.precio_neto + $scope.component.iva_neto + $scope.component.impuesto + $scope.component.qn;
  }

  $scope.$watch('component', function(newValue, oldValue) {
    agustinMarica();
  }, true);

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
	};

	$scope.ok = function () {
    $scope.form.$submitted = true;
    if($scope.form.$valid){
    	var resource = $injector.get(tipo);
    	$scope.component.user_id = $localStorage.user.id;
      delete $scope.component.monto_abonado;
      delete $scope.component.monto_abonado_pesos;
      delete $scope.component.cambios;
      delete $scope.component.cambio;
    	resource.update({id: $scope.component.id}, $scope.component).$promise.then(function(res) {
    		$uibModalInstance.close(res);
    	});
    }
	};

  Iva.query().$promise.then(function(res) {
    $scope.ivas = res;
  });
});