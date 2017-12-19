gdoApp.factory('User', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/api/users/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

//test