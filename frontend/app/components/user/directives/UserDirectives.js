gdoApp.directive('userAutocomplete', function(Comun, Oportunity, UserHelper) {
  return {
    restrict: 'AE',
    scope: {
      model:'=',
      selected: '=',
      label: '=',
      options: '=?'
    },
    templateUrl: 'user/directives/autocomplete.html',
    controller: function($scope) {
      $scope.options = $scope.options || {emptyBtn: true};

    	$scope.getUser = function(val) {
		    return UserHelper.autocomplete(val);
		  };

		  $scope.selectedUser = function(selected) {
        $scope.model = selected.id;
        setTimeout(function() {
          if($scope.options.onChange) {
            $scope.$parent[$scope.options.onChange](selected);
          }
        }, 10);

		  };

      $scope.vaciar = function() {
        $scope.model = null;
        $scope.selected = '';
      }
    }
  }
});