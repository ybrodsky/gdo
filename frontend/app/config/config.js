gdoApp.config(function(paginationTemplateProvider) {
  paginationTemplateProvider.setPath('pagination/template.html');
});

gdoApp.constant('angularMomentConfig', {
  timezone: 'America/Argentina/Buenos_Aires' // optional
});

gdoApp.config(function ($provide) {
  $provide.decorator('$state', function ($delegate) {
    // let's locally use 'state' name
    var state = $delegate;

    // let's extend this object with new function
    // 'baseGo', which in fact, will keep the reference
    // to the original 'go' function
    state.baseGo = state.go;

    // here comes our new 'go' decoration
    var go = function (to, params, options) {
      options = options || {};

      // only in case of missing 'reload'
      // append our explicit 'true'
      if (angular.isUndefined(options.reload)) {

          options.reload = true;
      }

      // return processing to the 'baseGo' - original
      this.baseGo(to, params, options);
    };

    // assign new 'go', right now decorating the old 'go'
    state.go = go;

    return $delegate;
  });
});

gdoApp.config(function(uibDatepickerConfig, uibDatepickerPopupConfig) {
  uibDatepickerConfig.startingDay = 1;
  uibDatepickerConfig.showWeeks = false;
  uibDatepickerConfig.formatYear = 'yy';

  uibDatepickerPopupConfig.datepickerPopup = "dd-MM-yyyy";
  uibDatepickerPopupConfig.currentText = "Hoy";
  uibDatepickerPopupConfig.clearText = "Vaciar";
  uibDatepickerPopupConfig.closeText = "Cerrar";

  uibDatepickerConfig.ngModelOptions = {timezone: 'America/Argentina/Buenos_Aires'};

});

Number.prototype.roundNum = function() {
  return Math.round(this * 10000) / 10000;
}