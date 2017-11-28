gdoApp.factory('UserHelper', function(moment, User, $http) {
  return {
    autocomplete: function(val) {
      var query = {
        where: {
          active: true,
          '$or': []
        },
        attributes: ['id', 'name', 'surname', 'email'],
        sort: 'surname ASC'
      };
      if(!isNaN(parseInt(val))) {
        delete query.where['$or'];
        query.where.id  = parseInt(val);
      }else {
        var arr = val.split(' ');
        arr.forEach(function(eachVal) {
          query.where['$or'].push({email: {'like': '%' + escape(eachVal)+ '%'}});
          query.where['$or'].push({name: {'like': '%' + escape(eachVal)+ '%'}});
          query.where['$or'].push({surname: {'like': '%' + escape(eachVal)+ '%'}});
        });
      }
      return User.autocomplete(query).$promise.then(function(response) {
        return response.map(function(item) {
          return {
            label: item.surname + ' ' + item.name,
            email: item.email,
            id: item.id
          };
        });
      });
    },
  }
});