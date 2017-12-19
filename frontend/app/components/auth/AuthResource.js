gdoApp.factory('Auth', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/api', {
    //id: '@_id'
  }, {
    login: {
      url: globalVariables.url + '/api/auth/login',
      method: 'POST'
    },
    me: {
      url: globalVariables.url + '/api/auth/me',
      method: 'GET'
    }
  });
});