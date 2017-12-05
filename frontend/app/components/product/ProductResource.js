gdoApp.factory('Product', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/products/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

//test