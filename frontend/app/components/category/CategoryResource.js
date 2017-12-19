gdoApp.factory('Category', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/api/categories/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

//test