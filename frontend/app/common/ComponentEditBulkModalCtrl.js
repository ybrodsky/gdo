gdoApp.controller('ComponentEditBulkModalCtrl', function($scope, $window, $localStorage, moment, $q, Comun, $uibModalInstance, ComponentHelper, selected, precio_venta, precio_neto, tipo, gasto_gestion, Iva, Api, $injector) {
  $scope.desglose = {};
  $scope.tipo = tipo;
  $scope.selected = angular.copy(selected);
  $scope.gasto_gestion = gasto_gestion;

  $scope.global = {
    precio_venta: 0,
    precio_neto: 0,
    impuesto: 0,
    condicion_iva: null,
    desglose: [],
    desde: $scope.selected[0].component.desde ? new Date($scope.selected[0].component.desde) : '',
    hasta: $scope.selected[0].component.hasta ? new Date($scope.selected[0].component.hasta) : '',
    facial: 0,
    condicion_over: null,
    over: 0,
    qn: 0,
    comision: 0,
    venta_neta: 0,
    iva_neto: 0,
    pagar_bsp: 0,
    id_reserva: $scope.selected[0].component.id_reserva
  };

  if($scope.tipo == 'Traslado') {
    $scope.global.desde = $scope.selected[0].component.desde ? new Date($scope.selected[0].component.desde) : '';
    $scope.global.hasta = $scope.selected[0].component.hasta ? new Date($scope.selected[0].component.hasta) : '';
    $scope.global.desde_hora = $scope.selected[0].component.desde_hora;
    $scope.global.informacion_desde = $scope.selected[0].component.informacion_desde;
    $scope.global.desde_pick_up = $scope.selected[0].component.desde_pick_up;
    $scope.global.desde_drop_off = $scope.selected[0].component.desde_drop_off;
    $scope.global.recorrido = $scope.selected[0].component.recorrido;
    $scope.global.hasta_hora = $scope.selected[0].component.hasta_hora;
    $scope.global.informacion_hasta = $scope.selected[0].component.informacion_hasta;
    $scope.global.hasta_pick_up = $scope.selected[0].component.hasta_pick_up;
    $scope.global.hasta_drop_off = $scope.selected[0].component.hasta_drop_off;
  }

  if($scope.tipo == 'Bus') {
    $scope.global.desde = $scope.selected[0].component.desde ? new Date($scope.selected[0].component.desde) : '';
    $scope.global.hasta = $scope.selected[0].component.hasta ? new Date($scope.selected[0].component.hasta) : '';
    $scope.global.desde_hora = $scope.selected[0].component.desde_hora;
    $scope.global.desde_hora_llegada = $scope.selected[0].component.desde_hora_llegada;
    $scope.global.hasta_hora = $scope.selected[0].component.hasta_hora;
    $scope.global.hasta_hora_llegada = $scope.selected[0].component.hasta_hora_llegada;
  }

  if($scope.tipo == 'Transport') {
    $scope.global.ruta = $scope.selected[0].component.ruta;
    angular.forEach($scope.global.ruta, function(tramo, key) {
      angular.forEach(tramo, function(subtramo, key) {
        subtramo.origen.ciudad = subtramo.origen.ciudad || '';
        subtramo.origen.fecha = Comun.fecha(subtramo.origen.fecha);
        subtramo.destino.ciudad = subtramo.destino.ciudad || '';
        subtramo.destino.fecha = Comun.fecha(subtramo.destino.fecha);
      });
    });
    Api.companias({order: 'name ASC', where: {type: {'$in': ['AER', 'BUS', 'CRC', 'OPE']}}}).$promise.then(function(res) {
      $scope.companias = res;
    });
  }

  function agustinMarica() {
    $scope.global.iva_neto = ComponentHelper.calcularIva($scope.global, {gasto_gestion: $scope.gasto_gestion}).neto;
    $scope.global.pagar_bsp = $scope.global.precio_neto + $scope.global.iva_neto + $scope.global.impuesto + $scope.global.qn;
  }

  $scope.$watch('global.desde_hora_llegada', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.desde_hora_llegada = newValue;
      });
    }
  });

  $scope.$watch('global.hasta_hora_llegada', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.hasta_hora_llegada = newValue;
      });
    }
  });

  $scope.$watch('global.desde_hora', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.desde_hora = newValue;
      });
    }
  });

  $scope.$watch('global.informacion_desde', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.informacion_desde = newValue;
      });
    }
  });

  $scope.$watch('global.desde_pick_up', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.desde_pick_up = newValue;
      });
    }
  });

  $scope.$watch('global.desde_drop_off', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.desde_drop_off = newValue;
      });
    }
  });

  $scope.$watch('global.recorrido', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.recorrido = newValue;
      });
    }
  });

  $scope.$watch('global.hasta_hora', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.hasta_hora = newValue;
      });
    }
  });

  $scope.$watch('global.informacion_hasta', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.informacion_hasta = newValue;
      });
    }
  });

  $scope.$watch('global.hasta_pick_up', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.hasta_pick_up = newValue;
      });
    }
  });

  $scope.$watch('global.hasta_drop_off', function(newValue, oldValue) {
    if(newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.hasta_drop_off = newValue;
      });
    }
  });

  $scope.$watch('global.ruta', function(newValue, oldValue) {
    if (newValue != oldValue) {
      $window.ga('send', 'event', 'Click boton', 'Editar rutas multiples', $localStorage.user.email);
      angular.forEach($scope.selected, function(item) {
        item.component.ruta = newValue;
      });
    }
  }, true);

  $scope.$watch('global.facial', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.facial = newValue;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.condicion_over', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.condicion_over = newValue;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.over', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.over = newValue;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.qn', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.qn = newValue;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.comision', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.comision = newValue;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.venta_neta', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.venta_neta = newValue;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.desde', function(newValue, oldValue) {
    if (newValue != oldValue) {console.log(newValue, oldValue)
      angular.forEach($scope.selected, function(item) {
        item.component.desde = newValue;
      });
    }
  });

  $scope.$watch('global.hasta', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.hasta = newValue;
      });
    }
  });

  $scope.$watch('global.id_reserva', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.id_reserva = newValue;
      });
    }
  });

  $scope.$watch('global.precio_venta', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        var multiplicador = item.component.dias_viaje || item.component.noches || 0;
        var divisor = ($scope.tipo == 'Package') ? $scope.selected.length : 1;

        item.component.precio_venta = newValue / divisor;
        item.component.fantasia_venta = newValue / divisor * multiplicador;
      });
    }
  });

  $scope.$watch('global.precio_neto', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        var multiplicador = item.component.dias_viaje || item.component.noches || 0;
        var divisor = ($scope.tipo == 'Package') ? $scope.selected.length : 1;

        item.component.precio_neto = newValue / divisor;
        item.component.fantasia_neto = newValue / divisor * multiplicador;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.impuesto', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        var multiplicador = item.component.dias_viaje || item.component.noches || 0;
        var divisor = ($scope.tipo == 'Package') ? $scope.selected.length : 1;

        item.component.impuesto = newValue / divisor;
        item.component.fantasia_impuesto = newValue /divisor * multiplicador;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.condicion_iva', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        item.component.condicion_iva = newValue;
      });
      if($scope.tipo == 'Transport') {
        agustinMarica()
      }
    }
  });

  $scope.$watch('global.desglose', function(newValue, oldValue) {
    if (newValue != oldValue) {
      angular.forEach($scope.selected, function(item) {
        var divisor = ($scope.tipo == 'Package') ? $scope.selected.length : 1;
        item.component.desglose = angular.copy(newValue);
        angular.forEach(item.component.desglose, function(itemDesglose, index) {
          itemDesglose.precio_neto = itemDesglose.precio_neto / divisor;
          itemDesglose.iva = itemDesglose.iva / divisor;
        });
      });
    }
  }, true);

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  };

  $scope.ok = function () {
    $scope.form.$submitted = true;
    if($scope.form.$valid) {

      var promises = [];
      angular.forEach($scope.selected, function(c) {
        var resource = $injector.get(c.resource);

        delete c.component.monto_abonado;
        delete c.component.monto_abonado_pesos;
        delete c.component.cambios;
        delete c.component.cambio;

        promises.push(resource.update({
          id: c.component.id
        }, c.component).$promise);
      });

      $q.all(promises).then(function() {
        $uibModalInstance.close();
      });
    }
  };

  $scope.sacarTramo = function(index) {
    $scope.global.ruta.splice(index, 1);
  };

  $scope.agregarTramo = function() {
    $scope.global.ruta.push([{origen: {}, destino: {}, clase: '', tipo_transporte: ''}]);
  };

  $scope.sacarSubtramo = function(tramoIndex, subtramoIndex) {
    $scope.global.ruta[tramoIndex].splice(subtramoIndex, 1);
  }

  $scope.agregarSubtramo = function(index) {
    $scope.global.ruta[index].push({origen: {}, destino: {}, clase: '', tipo_transporte: ''});
  }
});