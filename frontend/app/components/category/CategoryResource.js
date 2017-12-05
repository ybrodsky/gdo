gdoApp.factory('Category', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/categories/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

//test