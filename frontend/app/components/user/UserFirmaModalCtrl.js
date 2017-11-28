gdoApp.controller('UserFirmaModalCtrl', function($scope, $uibModalInstance, user) {

	$scope.tel = user.phone + ' - Int. ' + user.intern;
	$scope.fax = '(+54.11) 5258.2578';
	$scope.sucursal_domicilio = 'Cerrito 844 - C1010AAR - Buenos Aires, Argentina';
	$scope.sucursal = 'Sucursal Tribunales';
	$scope.email = user.email;
	$scope.puesto = 'Puesto';
	$scope.nombre = user.name + ' ' + user.surname;
  $scope.pie = 'Importante: Documentación: El embarque está sujeto a la presentación de la documentación en regla, en buen estado y con las fotografías actualizadas. Es responsabilidad de los señores pasajeros, informarse antes los organismos correspondientes, acerca de la documentación requerida para su viaje, así como también la tramitación y presentación a término de la misma. Las tarifas están sujetas a disponibilidad al momento de efectuar la reserva, fluctuaciones de las monedas, condiciones y/o modificaciones por parte de las compañías aéreas, sin previo aviso.';

	$scope.cancel = function() {
    $uibModalInstance.dismiss();
  };

  $scope.ok = function() {
	 	var chatbox = angular.element.find("#html_firma");
  	$uibModalInstance.close(String(chatbox[0].innerHTML).trim());
	};
});