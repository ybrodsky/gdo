
gdoApp.factory('Comun', function(moment, Notification, $http, $rootScope, User, Auth, $localStorage) {
  return {
    toaster: function(tipo, title, message) { //console.log(tipo);
      return Notification[tipo]({message: message, title: title, positionY: 'bottom', positionX: 'left', delay: 5000});
    },
    validEmail: function(str) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(str);
    }
  };
});
