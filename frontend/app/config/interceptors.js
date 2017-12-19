gdoApp.factory('paramsInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
  return {
    request: function(config) {
      if (config.params) {
        if (config.params.include && typeof config.params.include != 'string') {
          config.params.include = JSON.stringify(config.params.include);
        }
        if (config.params.attributes && typeof config.params.attributes != 'string') {
          config.params.attributes = JSON.stringify(config.params.attributes);
        }
      }
      return config;
    }
  }
}]);

gdoApp.factory('jwtInterceptor', function($localStorage) {
  return {
    request: function(config) {
      if($localStorage.token) {
        config.headers.jwt = $localStorage.token;
      }

      return config;
    }
  }
});

gdoApp.config(function($httpProvider) {
  //$httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.cache = false;
  $httpProvider.interceptors.push('unauthenticatedHttpResponseInterceptor');
  $httpProvider.interceptors.push('paramsInterceptor');
  $httpProvider.interceptors.push('jwtInterceptor');
});

gdoApp.factory('unauthenticatedHttpResponseInterceptor', ['$q', '$injector', '$rootScope',
  function($q, $injector, $rootScope) {
    return {
      responseError: function(rejection) {
        var Comun = $injector.get('Comun');
        if (rejection.status === 401) {
          var $localStorage = $injector.get('$localStorage');
          delete $localStorage.user;

          var $state = $injector.get('$state');
          $state.go('login');
          Comun.toaster('error', 'Error', 'Inicia sesión para continuar');
          return {};
        } else if (rejection.status === 403) {
          var $state = $injector.get('$state');
          $state.go('app.dashboard');
          Comun.toaster('error', 'Error', 'No tiene permisos para acceder a esa función');
          return $q.reject(rejection);
        } else if (rejection.status === 404) {
          var $state = $injector.get('$state');
          $state.go('app.dashboard');
          Comun.toaster('error', 'Error', 'No se encontro lo que estabas buscando');
          return $q.reject(rejection);
        } else if (rejection.status === 400) {
          Comun.toaster('error', 'Error', 'No se pudo guardar el registro porque hay campos incompletos o inválidos');
          return $q.reject(rejection);
        } else if (rejection.status === 409) {
          Comun.toaster('error', 'Error', 'No esta autorizado a modificar este elemento en este momento');
          return $q.reject(rejection);
        } else if (rejection.status === 418) {
          Comun.toaster('error', 'Error', rejection.data.error);
          return $q.reject(rejection);
        } else {
          return $q.reject(rejection);
        }
      }
    }
  }
]);