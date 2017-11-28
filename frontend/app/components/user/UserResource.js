gdoApp.factory('User', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/user/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

//test