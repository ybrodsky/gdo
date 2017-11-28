gdoApp.controller('ImportarInformacionCtrl', function($scope, $localStorage, moment, $uibModalInstance, Api, resources, budget_id, $injector) {
  $scope.results = [];
  angular.forEach(resources, function(resource) {
    var Resource = $injector.get(resource);
    var attributes = ['id', 'nombre'];
    if (resource == 'Hotel') {
      attributes.push('hotel');
    }
    if (resource == 'Transport') {
      attributes.push('ruta');
      attributes.push('recorrido');
    }
    Resource.query({
      budget_id: budget_id,
      opcional: false,
      attributes: attributes
    }).$promise.then(function(res) {
      if (resource == 'Transport') {
        var compañias = [];
        angular.forEach(res, function(transporte) {
          angular.forEach(transporte.ruta, function(tramo) {
            angular.forEach(tramo, function(subtramo) {
              if(subtramo.cuota_company_id) compañias.push(subtramo.cuota_company_id);
            });
          });
        });

        Api.companias({attributes: ['id', 'name'], where: {id: {'$in': compañias}}}).$promise.then(function(companias) {
          angular.forEach(companias, function(compania) {
            angular.forEach(res, function(transporte) {
              angular.forEach(transporte.ruta, function(tramo) {
                angular.forEach(tramo, function(subtramo) {
                  if(subtramo.cuota_company_id == compania.id) {
                    subtramo.texto = 'Vuelo: ' + (subtramo.numero_vuelo || '') + ' a ' + subtramo.destino.ciudad.label;
                    subtramo.texto += ' | Llega: ' + moment(subtramo.destino.fecha).format('DD/MM/YYYY') + ' ' + (subtramo.destino.hora || '');
                    subtramo.texto += ' | Compañia: ' + compania.name;
                  }
                });
              });
            });
          });

          merge(res);
        });
      }else {
        merge(res);
      }

    });
  });

  function merge(res) {
    $scope.results = _.union($scope.results, res);
  }

  $scope.cancel = function() {
    $uibModalInstance.dismiss();
  };
  $scope.ok = function(data) {
    $uibModalInstance.close(data);
  };
});