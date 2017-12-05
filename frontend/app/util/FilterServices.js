
gdoApp.factory('Filter', function($localStorage) {
  return {
    load: function(filters, name) {
      if(!$localStorage.filters)
        $localStorage.filters = {};

      if(!$localStorage.filters[name]) return filters;

      var dates = ['createdAt'];

      filters = _.extend(filters, $localStorage.filters[name]);

      angular.forEach(dates, function(date) {
        if($localStorage.filters[name][date]) {
          var from = $localStorage.filters[name][date].from ? new Date($localStorage.filters[name][date].from) : null;
          var to = $localStorage.filters[name][date].to ? new Date($localStorage.filters[name][date].to) : null;
          filters = _.extend(filters, {
            [date]: {
              from: from,
              to: to
            }
          });
        }
      });

      return filters;
    },
    save: function(filters, name) {
      if(!$localStorage.filters)
        $localStorage.filters = {};

      $localStorage.filters[name] = angular.copy(filters);
    },
    get: function(query, filtros, applyFilters) {
      filtros = angular.copy(filtros);

      var options = {
        aceptar_consultas: 'equal-with-zero',
        active: 'equal-with-zero',
        asignada: 'equal-with-zero',
        asignada_fecha: 'time-period',
        budget_id: 'equal',
        cancelled: 'equal-with-zero',
        cancel_limit: 'time-period',
        category_id: 'equal',
        completed: 'equal',
        createdAt: 'time-period',
        date: 'time-period',
        date_administracion: 'time-period',
        date_from: 'time',
        deleted: 'equal-with-zero',
        dni: 'like',
        email: 'like',
        fecha_abierta: 'time-period',
        fecha_vendida: 'time-period',
        id: 'equal',
        ingreso_operaciones: 'time-period',
        manual: 'equal-with-zero',
        model: 'equal',
        model_id: 'equal',
        name: 'like',
        nombre: 'like',
        oportunity_id: 'equal',
        origen: 'equal',
        phone: 'like',
        reservation_id: 'equal',
        reference: 'equal',
        rol_id: 'equal',
        salida_desde: 'time-period',
        sent_date: 'time-period',
        seleccionado: 'equal-with-zero',
        status: 'equal',
        surname: 'like',
        unidad_negocio_id: 'equal',
        user_id: 'equal',
        file_ycix: 'like',
      };

      applyFilters = applyFilters || Object.keys(options);

      for(key in options) {
        if(filtros.hasOwnProperty(key) && applyFilters.indexOf(key) != -1) {
          switch(options[key]) {
            case 'like':
              if(filtros[key])
                query.where[key] = {'$like': '%' + filtros[key] + '%'};
              break;
            case 'equal':
              if(filtros[key])
                query.where[key] = filtros[key];
              break;
            case 'equal-with-zero':
              //Que mierda es este invento?
              //Opciones con valores 0, 1, 2 donde 0 significa "indistinto"
              //Si el valor es cero, no hacemos nada. Si es 1 o 2, pasamos ese valor
              //restandole 1 porque en realidad es un booleano.
              if(parseInt(filtros[key])) {
                query.where[key] = parseInt(filtros[key]) - 1;
              }
              break;
            case 'time':
              if(filtros[key])
                query.where[key] = {'$gte': moment(filtros[key]).utc().startOf('day'), '$lte': moment(filtros[key]).utc().endOf('day')};
              break;
            case 'time-period':
              if(filtros[key]) {
                if(filtros[key].from && filtros[key].to) {
                  query.where[key] = {
                    '$gte': moment(filtros[key].from).utc().startOf('day'),
                    '$lte': moment(filtros[key].to).utc().endOf('day')
                  }
                } else if(filtros[key].from) {
                  query.where[key] = {
                    '$gte': moment(filtros[key].from).utc().startOf('day')
                  }
                } else if(filtros[key].to) {
                  query.where[key] = {
                    '$lte': moment(filtros[key].to).utc().endOf('day')
                  }
                }
              }
              break;
          }
        }
      }

      if(filtros.orderBy && filtros.order) {
        query.sort = filtros.orderBy + ' ' + filtros.order;
      }

      return query;
    },
  };
});
