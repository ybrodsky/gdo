gdoApp.factory('Sale', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/api/sales/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    payup: {
    	method: 'POST',
    	url: globalVariables.url + '/api/sales/payup'
    }
  });
});

//test