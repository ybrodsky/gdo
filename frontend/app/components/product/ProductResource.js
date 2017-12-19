gdoApp.factory('Product', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/api/products/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

//test