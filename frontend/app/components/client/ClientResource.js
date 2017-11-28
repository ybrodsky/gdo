gdoApp.factory('Client', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/api/clients/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    autocomplete: {
      method: 'GET',
      url: globalVariables.url + '/api/clients/autocomplete',
      isArray: true,
      headers: {
        ajaxLoader: false
      }
    }
  });
});