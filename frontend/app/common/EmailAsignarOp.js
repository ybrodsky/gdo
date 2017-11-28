gdoApp.controller('EmailAsignarOp', function($scope, globalVariables, $uibModalInstance, Api, Oportunity) {
  $scope.filtros = {};
  $scope.estados = globalVariables.oportunity_status;

  $scope.buscar = function() {
    var query = {
      skip: 0,
      limit: 10,
      where: {
        status: {'$not': null}
      },
      colaborador: 0,
      populate: [
        {model: 'User', attributes: ['id', 'name', 'surname']},
      ],
    };

    if ($scope.filtros.string) {
      var populateWhere = {
        '$or': [
          {
            email: {'$like': '%' + escape($scope.filtros.string) + '%'}
          },
          {
            name: {'$like': '%' + escape($scope.filtros.string) + '%'}
          },
          {
            surname: {'$like': '%' + escape($scope.filtros.string) + '%'}
          }
        ]
      };
      query.populate.push({model: 'Client', where: populateWhere, attributes: ['id', 'name', 'surname']});

    }else {
      query.populate.push({model: 'Client', attributes: ['id', 'name', 'surname']});
    }

    if($scope.filtros.id) {
      query.where = {
        id: $scope.filtros.id
      }
    }

    Oportunity.indexAlambrero(query, function(oportunities, header) {
      $scope.oportunities = oportunities;
      $scope.totalOportunities = header('X-Total-Count');
    });
  };

  $scope.seleccionar = function(selected) {
    $uibModalInstance.close(selected.id);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss();
  };
});