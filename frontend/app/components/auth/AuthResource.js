gdoApp.factory('Auth', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/', {
    //id: '@_id'
  }, {
    login: {
      url: globalVariables.url + '/login',
      method: 'POST'
    },
    logout: {
      url: globalVariables.url + '/logout',
      method: 'GET'
    },
  });
});