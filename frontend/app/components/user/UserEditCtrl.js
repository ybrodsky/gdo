gdoApp.controller('UserEditCtrl', function($scope, globalVariables, User, Comun, $uibModal, $localStorage, $stateParams, $state) {

  User.get({id: $stateParams.id, attributes: {exclude: ['password']}}).$promise.then(function(user) {
    $scope.user = user;
  });

  $scope.update = function() {
    if(!$scope.user.password)
      delete $scope.user.password;

    if(!$scope.user.email_password)
      delete $scope.user.email_password;

    User.update({id: $scope.user.id}, $scope.user).$promise.then(function(res) {
      Comun.toaster('success', 'Usuario', 'El usuario fue actualizado con éxito');
      $state.go('app.userIndex');
    });
  };
});