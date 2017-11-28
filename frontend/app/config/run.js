gdoApp.run(function(editableOptions, $confirmModalDefaults, $rootScope, $state, $stateParams, Auth, $localStorage, Comun, User, globalVariables, $window, $location) {
  editableOptions.theme = 'bs3';
  $confirmModalDefaults.defaultLabels.title = '¿Confirmar?';
  $confirmModalDefaults.defaultLabels.ok = 'Si';
  $confirmModalDefaults.defaultLabels.cancel = 'No';
  /*$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    if (!$localStorage.user && toState.name != 'login') {
      event.preventDefault();
      Comun.toaster('error', 'Error', 'Inicia sesión para continuar');
      return $state.go('login');
    }
  });*/
});