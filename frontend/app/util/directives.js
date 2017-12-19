
gdoApp.directive('restrict', function($localStorage){
  return{
    restrict: 'A',
    prioriry: 100000,
    scope: false,
    compile:  function(element, attr, linker){
      var accessDenied = true;

      var user = $localStorage.user ? $localStorage.user : null;

      if(user) {//console.log(user);
        var attributes = attr.restrict.split(", ");
        if(attributes.indexOf(String(user.rol_id)) == -1) {
          element.children().remove();
          element.remove();
        }
      }
    }
  }
});

gdoApp.directive('novalidate', function(Comun) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.on('submit', function() {
        if (!scope.form.$valid) {
          Comun.toaster('error', 'Error', 'No se pudo enviar el formulario, hay campos incompletos o erroneos');

          var firstInvalid = elem[0].querySelector('.ng-invalid');

          if (firstInvalid) {
            firstInvalid.focus();
          }
        }
      });
    }
  };
});

gdoApp.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return val != null ? parseInt(val, 10) : null;
      });
      ngModel.$formatters.push(function(val) {
        return val != null ? '' + val : null;
      });
    }
  };
});