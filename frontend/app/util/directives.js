
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
        if(attributes.indexOf(user.Rol.nombre.toLowerCase()) == -1) {
          element.children().remove();
          element.remove();
        }
      }
    }
  }
});

gdoApp.directive('restrictFields', function($localStorage, $compile) {
  return {
    restrict: 'AE',
    prioriry: 10000,
    scope: {
      status: '='
    },
    link: function($scope, element) {
      var disabled = false;

      var user = $localStorage.user ? $localStorage.user : null;
      var roles = ['admin', 'gerente', 'gerenteoperaciones'];

      if (user) {
        if (roles.indexOf(user.Rol.nombre.toLowerCase()) == -1) {
          disabled = true;
        } else {
          disabled = false;
        }
      }

      if ($scope.status != 3) {
        disabled = false;
      }

      if (disabled) {
        element.attr("readonly", "readonly");
      } else {
        element.removeAttr("readonly", "readonly");
      }
    },
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

gdoApp.directive('editorMagicoConFirma', function($localStorage, $sce) {
  return {
    restrict: 'AE',
    scope: {
      name: '=',
      required: '=',
      model: '=',
      height: '='
    },
    template: '<div name="{{name}}" ng-required="required" ng-model="model" summernote config="options" height="300"></div>',
    controller: function($scope) {

      $scope.options = {
        toolbar: [
          ['firma', ['firma']],
          ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
          ['fontface', ['fontname']],
          ['textsize', ['fontsize']],
          ['fontclr', ['color']],
          ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
          ['table', ['table']]
        ],
        buttons: {
          firma: function(context) {
            var ui = $.summernote.ui;

            // create button
            var button = ui.button({
              contents: '<i class="fa fa-pencil"/> Insertar firma',
              tooltip: 'Insertá la firma viejo',
              click: function() {
                var node = document.createElement('span');
                node.innerHTML = $sce.trustAsHtml($localStorage.user.firma);
                context.invoke('editor.insertNode', node);
              }
            });

            return button.render(); // return button as jquery object
          }
        }
      };
    },
    link: function($scope, $element, $attrs, ngModel) {
      $scope.name = $scope.name || 'body';
      $scope.required = $scope.required || false;
      $scope.height = $scope.height || 200;
    }
  }
});

gdoApp.directive('selectMoneda', function(globalVariables) {
  return {
    restrict: 'AE',
    scope: {
      model: '=',
      options: '='
    },
    template: `
      <div class="form-group" ng-class="{ 'has-error': (form.$submitted && form.moneda.$invalid)}">
        <label>Moneda:</label>
        <select name="moneda" required class="form-control" ng-model="model" ng-disabled="disabled" ng-options="n.value as n.label for n in monedas" ng-init="model = init">
          <option value="" disabled>Seleccioná una opción</option>
        </select>
        <div ng-messages="form.$submitted && form.moneda.$error">
          <p ng-message="required" class="help-block">Por favor completá este campo</p>
        </div>
      </div>
    `,
    controller: function($scope) {
      $scope.monedas = [
        {
          value: 'USD',
          label: 'USD'
        },
        {
          value: 'ARS',
          label: 'ARS'
        },
        {
          value: 'EUR',
          label: 'EUR'
        }
      ];
      $scope.form = $scope.options.form;
      $scope.disabled = $scope.options.disabled || false;
      $scope.init = $scope.options.init || $scope.model;
    }
  }
});

gdoApp.directive('selectIva', function(Iva) {
  return {
    restrict: 'AE',
    scope: {
      model: '=',
    },
    template: `
      <div class="form-group">
        <label>Condicion IVA</label>
        <select class="form-control" ng-model="model" ng-options="iva.nombre for iva in ivas track by iva.id"></select>
      </div>
    `,
    controller: function($scope) {
      Iva.query({}, function(res) {
        $scope.ivas = res;
      });
    }
  }
});

gdoApp.directive('calcularNoches', function(moment) {
  return {
    restrict: 'AE',
    scope: {
      desde: '=',
      hasta: '='
    },
    template: '<div class="form-group" ng-if="noches"><label>Noches</label><div class="input-group" uib-tooltip="Botón" tooltip-placement="right"><input type="text" class="form-control" ng-model="noches" readonly/> <span class="input-group-addon"><i class="fa fa-moon-o"></i></span></div></div>',
    link: function($scope) {
      $scope.$watch('desde', function(newVal, oldVal) {
        calcular();
      });
      $scope.$watch('hasta', function(newVal, oldVal) {
        calcular();
      });
      function calcular() {
        var x = moment($scope.desde).startOf('day');
        var y = moment($scope.hasta).endOf('day');
        $scope.noches = y.diff(x, 'days');
      }

    }
  }
});

gdoApp.directive('calcularDias', function(moment) {
  return {
    restrict: 'AE',
    scope: {
      desde: '=',
      hasta: '='
    },
    template: '<div class="form-group" ng-if="dias"><label>Días</label><div class="input-group"><input type="text" class="form-control" ng-model="dias" readonly/> <span class="input-group-addon"><i class="fa fa-sun-o"></i></span></div></div>',
    link: function($scope) {
      $scope.$watch('desde', function(newVal, oldVal) {
        calcular();
      });
      $scope.$watch('hasta', function(newVal, oldVal) {
        calcular();
      });
      function calcular() {
        var x = moment($scope.desde).startOf('day');
        var y = moment($scope.hasta).endOf('day');
        $scope.dias = y.diff(x, 'days') + 1;
      }

    }
  }
});

gdoApp.directive('budgetAgregarCliente', function(Comun, Oportunity, ClientHelper) {
  return {
    restrict: 'AE',
    scope: {
      oportunity:'='
    },
    template: `
      <div class="alert alert-info text-center">
        ¡Estás agregando un cliente a la oportunidad!
      </div>
      <div class="form-group">
        <input type="text" ng-model="asyncSelectedClient" typeahead-on-select="selectedClient($item)" uib-typeahead="clients as clients.label for clients in getClient($viewValue)" class="form-control" placeholder="Buscar Cliente">
      </div>
      <hr/>
    `,
    controller: function($scope) {
      $scope.getClient = function(val) {
        return ClientHelper.autocomplete(val);
      };

      $scope.selectedClient = function(selected) {
        $scope.oportunity.client.push(selected.data);
        $scope.asyncSelectedClient = '';
        Oportunity.update({id: $scope.oportunity.id}, $scope.oportunity).$promise.then(function() {
          Comun.toaster('success', 'Oportunidad', 'Se agregó el cliente a la oportunidad');
        });
      };
    }
  }
});

gdoApp.directive('selectPasajeros', function(globalVariables) {
  return {
    template: `
      <taira-multiselect
        model="component.personas"
        options="dataSet"
        settings="{
          display: {
            prepend: 'Pasajero #',
            fields: [
              'numero',
              {raw: true, value: '- '},
              {value: 'edad', transform: getAge},
              {raw: true, value: ' | '},
              'client.name',
              'client.surname'
            ]
          },
          extra: {
            containerClass: 'width-100 multiselect-container',
            template: 'teh-template-list'
          },
          select: {
            fields: ['id']
          }
        }"
        class="block"
      >
      </taira-multiselect>
    `,
    controller: function($scope) {
      $scope.getAge = function(val) {
        return globalVariables.edades[val.trim()];
      }
    }
  }
});

gdoApp.directive('componentEditarLink', function($sce, $state) {
  return {
    restrict: 'AE',
    scope: {
      component: '=',
      conditional: '='
    },
    replace: true,
    template: `<a ng-click="resolveLink()"><i class="fa fa-pencil"></i> Editar</a>`,
    controller: function($scope) {

      $scope.resolveLink = function() {
        let states = {
          Asistencia: 'app.budgetEditComponent.asistencia',
          Traslado: 'app.budgetEditComponent.traslado',
          Transport: 'app.budgetEditComponent.transport',
          Extra: 'app.budgetEditComponent.extra',
          Atraccion: 'app.budgetEditComponent.atraccion',
          Auto: 'app.budgetEditComponent.auto',
          Hotel: 'app.budgetEditComponent.hotel',
          Package: 'app.budgetEditComponent.package',
          Bus: 'app.budgetEditComponent.bus',
          Cruise: 'app.budgetEditComponent.cruise',
        }

        $state.go(states[$scope.conditional], {budget_id: $scope.component.budget_id, id: ($scope.component.auto_id || $scope.component.room_id || $scope.component.id)});
      }
    }
  }
});

gdoApp.directive('componentEditarNamed', function($sce, $state) {
  return {
    restrict: 'AE',
    scope: {
      component: '=',
      conditional: '='
    },
    replace: true,
    template: `<a ng-click="resolveLink()">{{conditional}}</a>`,
    controller: function($scope) {

      $scope.resolveLink = function() {
        let states = {
          Asistencia: 'app.budgetEditComponent.asistencia',
          Traslado: 'app.budgetEditComponent.traslado',
          Transport: 'app.budgetEditComponent.transport',
          Extra: 'app.budgetEditComponent.extra',
          Atraccion: 'app.budgetEditComponent.atraccion',
          Auto: 'app.budgetEditComponent.auto',
          Hotel: 'app.budgetEditComponent.hotel',
          Package: 'app.budgetEditComponent.package',
          Bus: 'app.budgetEditComponent.bus',
          Cruise: 'app.budgetEditComponent.cruise',
        }

        $state.go(states[$scope.conditional], {budget_id: $scope.component.budget_id, id: ($scope.component.auto_id || $scope.component.room_id || $scope.component.id)});
      }
    }
  }
});

gdoApp.directive('pasajerosAereos', function() {
  return {
    restrict: 'E',
    scope: {
      TarifasPorPax: '=info',
      desgloseTarifas: "@"
    },
    template: `
      <li class="pull-left" ng-if="desgloseTarifas.adultos.cantidad > 0">
        <span class="pull-left text-left">{{desgloseTarifas.adultos.tipo}} ({{desgloseTarifas.adultos.cantidad}})</span>
        <span class="pull-right text-right">{{desgloseTarifas.adultos.moneda}} {{desgloseTarifas.adultos.total | number:0}}</span>
      </li>

      <li class="pull-left" ng-if="desgloseTarifas.child.cantidad > 0">
        <span class="pull-left text-left">{{desgloseTarifas.child.tipo}} ({{desgloseTarifas.child.cantidad}})</span>
        <span class="pull-right text-right">{{desgloseTarifas.child.moneda}} {{desgloseTarifas.child.total | number:0}}</span>
      </li>

      <li class="pull-left" ng-if="desgloseTarifas.inf.cantidad > 0">
        <span class="pull-left text-left">{{desgloseTarifas.inf.tipo}} ({{desgloseTarifas.inf.cantidad}})</span>
        <span class="pull-right text-right">{{desgloseTarifas.inf.moneda}} {{desgloseTarifas.inf.total | number:0}}</span>
      </li>
    `,
    controller: function($scope) {
      var totalesPorPasajeros = {
        adultos: {
          tipo: null,
          cantidad: 0,
          total: 0
        },
        child: {
          tipo: null,
          cantidad: 0,
          total: 0
        },
        inf: {
          tipo: null,
          cantidad: 0,
          total: 0
        }
      };

      var adultos = ['IIT'];
      var menores = ['CNN', 'INN', 'CHD'];
      var infantes = ['INF', 'ITF'];

      for (e in $scope.TarifasPorPax) {
        if (adultos.indexOf($scope.TarifasPorPax[e].tipo[0]) != -1) {
          totalesPorPasajeros.adultos.tipo = 'Adultos';
          totalesPorPasajeros.adultos.cantidad += 1;
          totalesPorPasajeros.adultos.total += $scope.TarifasPorPax[e].tarifa.tarifa;
        }

        if (menores.indexOf($scope.TarifasPorPax[e].tipo[0]) != -1) {
          totalesPorPasajeros.child.tipo = 'Niños';
          totalesPorPasajeros.child.cantidad += 1;
          totalesPorPasajeros.child.total += $scope.TarifasPorPax[e].tarifa.tarifa;
        }

        if (infantes.indexOf($scope.TarifasPorPax[e].tipo[0]) != -1) {
          totalesPorPasajeros.inf.tipo = 'Bebes';
          totalesPorPasajeros.inf.cantidad += 1;
          totalesPorPasajeros.inf.total += $scope.TarifasPorPax[e].tarifa.tarifa;
        }
      }

      $scope.desgloseTarifas = totalesPorPasajeros;
    }
  }
});

gdoApp.directive('validarCodigoPago', function(globalVariables) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var codigos = globalVariables.codigos_pago;

      ngModel.$validators.codigo = function(modelValue) {
        if(!modelValue) return false;

        var code = modelValue.split('-');

        return code.length == 2 && codigos.indexOf(code[0]) != -1;
      };
    }
  }
});

gdoApp.directive('estadoComponente', function(moment, globalVariables) {
  return {
    restrict: 'AE',
    scope: {
      status: '='
    },
    template: '<span class="{{reservasTotalesPorEstado[status].clase}}">{{estados_reservas[status]}}</span>',
    link: function($scope) {
      $scope.estados_reservas = globalVariables.reservation_status;
      $scope.reservasTotalesPorEstado = {
        0: {id: 0, total: 0, clase: 'blueberry'},
        1: {id: 1, total: 0, clase: 'grape'},
        2: {id: 2, total: 0, clase: 'orange'},
        3: {id: 3, total: 0, clase: 'kiwi'},
        4: {id: 4, total: 0, clase: 'lemon'},
        5: {id: 5, total: 0, clase: 'peach'},
        6: {id: 6, total: 0, clase: 'apple'},
        7: {id: 7, total: 0, clase: 'lime'}
      };

    }
  }
});

gdoApp.directive('importarInformacion', function($injector, $uibModal, $window, $localStorage) {
  return {
    replace: true,
    restrict: 'AE',
    scope: {
      model: '=',
      options: '=?',
      budget: '='
    },
    template: '<span class="input-group-btn"><button class="btn btn-default" type="button" ng-click="buscarComponentes()" uib-tooltip="Buscar..."><i class="fa fa-search"></i></button></span>',
    link: function($scope) {
      var resources = [];
      $scope.options = $scope.options ? $scope.options : {};
      $scope.options = {
        hotel: $scope.options.hotel || true,
        transporte: $scope.options.transporte || true,
        atraccion: $scope.options.atraccion || true,
        crucero: $scope.options.crucero || true,
        bus: $scope.options.bus || true
      };

      if($scope.options.hotel) resources.push('Hotel');
      if($scope.options.transporte) resources.push('Transport');
      if($scope.options.atraccion) resources.push('Atraccion');
      if($scope.options.crucero) resources.push('Cruise');
      if($scope.options.bus) resources.push('Bus');

      $scope.buscarComponentes = function() {
        $window.ga('send', 'event', 'Click boton 2', 'Boton importar informacion', $localStorage.user.email);
        var modalInstance = $uibModal.open({
          templateUrl: 'importar_informacion.html',
          controller: 'ImportarInformacionCtrl',
          size: 'lg',
          resolve: {
            resources: function () {
              return resources;
            },
            budget_id: function() {
              return $scope.budget;
            }
          }
        });

        modalInstance.result.then(function (data) {
          if(data) $scope.model = data;
        }, function () {});
      }
    }
  }
});

gdoApp.directive('componentePagado', function(moment) {
  return {
    restrict: 'AE',
    scope: {
      componente: '=',
      gastogestion: '='
    },
    template: '<span>{{estado}}</span>',
    link: function($scope) {
      var dias = $scope.componente.dias_viaje || $scope.componente.noches || 1;
      var percepcion = $scope.componente.percepcion || 0;
      var impuesto = $scope.componente.impuesto || 0;
      var venta = $scope.componente.precio_venta;

      var total = (venta + percepcion) * dias;
      total = total + (total * $scope.gastogestion / 100);

      if(total <= $scope.componente.monto_abonado) {
        $scope.estado = 'Abonado total';
      }else {
        $scope.estado = 'Abonado $' + parseFloat($scope.componente.monto_abonado).toFixed(2) + $scope.componente.moneda;
      }

    }
  }
});

gdoApp.directive('desglose', function() {
  return {
    restrict: 'AE',
    scope: {
      model: '='
    },
    controller: function($scope) {
      $scope.desglose = {};

      $scope.agregarDesglose = function() {

        if(!$scope.desglose.nombre || !$scope.desglose.condicion_iva)
          return false;

        $scope.desglose.iva = $scope.desglose.iva || 0;
        if($scope.desglose.condicion_iva == '21' || $scope.desglose.condicion_iva == 21) {
          $scope.desglose.precio_neto = parseFloat($scope.desglose.iva * 100 / 21).toFixed(2);
        }else if($scope.desglose.condicion_iva == '10,5' || $scope.desglose.condicion_iva == 10.5) {
          $scope.desglose.precio_neto = parseFloat($scope.desglose.iva * 100 / 10.5).toFixed(2);
        }
        $scope.model.desglose.push($scope.desglose);
        $scope.desglose = {};

      };

      $scope.quitarDesglose = function(n) {
        $scope.model.desglose.splice(_.findIndex($scope.model.desglose, n), 1);
      };
    },
    template: `
      <div class="row">
        <div class="col-md-12">
          <div class="well blueberry" restrict="operaciones, gerenteoperaciones, administracion, admin">
            <h4 class="page-header">
              <i class="fa fa-list"></i>
              Desglose de IVA
              <div class="btn btn-success btn-xs pull-right" ng-click="isCollapsedDesglose = !isCollapsedDesglose">
                <i class="fa fa-plus"></i>
              </div>
            </h4>
            <div class="row" uib-collapse="!isCollapsedDesglose">
              <div class="col-md-4">
                <div class="form-group">
                  <label>Nombre</label>
                  <input class="form-control" name="inombre" ng-model="desglose.nombre" type="text"/>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Condicion iva</label>
                  <select class="form-control" name="iiva" ng-model="desglose.condicion_iva">
                    <option disabled="" value="">...</option>
                    <option value="10,5">10,5%</option>
                    <option value="21">21%</option>
                  </select>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label>Monto iva</label>
                  <input class="form-control" min="0" name="ineto" ng-min="0" ng-model="desglose.iva" type="number"/>
                </div>
              </div>
              <div class="col-md-12">
                <a class="btn btn-default btn-block" ng-click="agregarDesglose()">
                  Agregar
                </a>
              </div>
              <div class="col-md-12">
                <hr/>
                <table class="table" ng-if="model.desglose.length">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Cond. Iva</th>
                      <th>Monto iva</th>
                      <th>Neto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr ng-repeat="n in model.desglose">
                      <td>{{n.nombre}}</td>
                      <td>{{n.condicion_iva}}%</td>
                      <td>\${{n.iva | number: 2}}</td>
                      <td>\${{n.precio_neto}}</td>
                      <td>
                        <button class="btn btn-danger btn-xs" ng-click="quitarDesglose(n)">
                          Quitar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }
})