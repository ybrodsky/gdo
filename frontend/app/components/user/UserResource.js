gdoApp.factory('User', function($resource, globalVariables) {
  return $resource(globalVariables.url + '/user/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    cuenta: {
      method: 'PUT',
      url: globalVariables.url + '/user/cuenta/:id',
    },
    unseen: {
      url: globalVariables.url + '/user/unseen',
      method: 'GET',
    },
    autocomplete: {
      method: 'GET',
      url: globalVariables.url + '/user',
      isArray: true,
      headers: {
        ajaxLoader: false
      }
    },
  });
});

//test