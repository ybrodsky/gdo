gdoApp.run(function(editableOptions, $confirmModalDefaults, $rootScope, $state, $stateParams, Auth, $localStorage, Comun, User, globalVariables, $window, $location) {
  editableOptions.theme = 'bs3';
  $confirmModalDefaults.defaultLabels.title = '¿Confirmar?';
  $confirmModalDefaults.defaultLabels.ok = 'Si';
  $confirmModalDefaults.defaultLabels.cancel = 'No';
  Auth.me().$promise.then(function(res) {
    $localStorage.user = res;
  });
});