gdoApp.controller('NavbarCtrl', function($scope, Comun, $window, $localStorage, $state, User, $uibModal) {
  $scope.user = $localStorage.user;
});