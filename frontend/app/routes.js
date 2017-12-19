gdoApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/app/");

  $stateProvider.state('login', {
    url: "/login",
    templateUrl: "auth/login.html",
    controller: 'AuthLoginCtrl'
  }).state('logout', {
    url: "/logout",
    controller: 'AuthLogoutCtrl'
  });

  $stateProvider.state('app', {
    url: '/app',
    templateUrl: 'index/navbar.html',
    controller: 'NavbarCtrl',
    abstract: true
  });

  $stateProvider.state('app.dashboard', {
    url: "/",
    templateUrl: "dashboard/index.html",
    controller: 'DashboardCtrl'
  }).state('app.clientsIndex', {
    url: "/clientes",
    templateUrl: "client/index.html",
    controller: 'ClientIndexCtrl'
  }).state('app.clientAdd', {
    url: "/clientes/agregar",
    templateUrl: "client/add.html",
    controller: 'ClientAddCtrl'
  }).state('app.clientEdit', {
    url: "/clientes/editar/:id",
    templateUrl: "client/add.html",
    controller: 'ClientEditCtrl'
  }).state('app.clientCuenta', {
    url: "/clientes/cuenta/:id",
    templateUrl: "client/cuenta.html",
    controller: 'ClientCuentaCtrl'
  }).state('app.saleStat', {
    url: "/reportes",
    templateUrl: "sale/stat.html",
    controller: 'SaleStatCtrl'
  });

  $stateProvider.state('app.userIndex', {
    url: "/usuarios",
    templateUrl: "user/index.html",
    controller: 'UserIndexCtrl'
  }).state('app.userAdd', {
    url: "/usuarios/agregar",
    templateUrl: "user/add.html",
    controller: 'UserAddCtrl'
  }).state('app.userEdit', {
    url: "/usuarios/editar/:id",
    templateUrl: "user/edit.html",
    controller: 'UserEditCtrl'
  });

  $stateProvider.state('app.categoryIndex', {
    url: "/categorias",
    templateUrl: "category/index.html",
    controller: 'CategoryIndexCtrl'
  }).state('app.categoryAdd', {
    url: "/categorias/agregar",
    templateUrl: "category/add.html",
    controller: 'CategoryAddCtrl'
  }).state('app.categoryEdit', {
    url: "/categorias/editar/:id",
    templateUrl: "category/edit.html",
    controller: 'CategoryEditCtrl'
  });

  $stateProvider.state('app.productIndex', {
    url: "/productos",
    templateUrl: "product/index.html",
    controller: 'ProductIndexCtrl'
  }).state('app.productAdd', {
    url: "/productos/agregar",
    templateUrl: "product/add.html",
    controller: 'ProductAddCtrl'
  }).state('app.productEdit', {
    url: "/productos/editar/:id",
    templateUrl: "product/edit.html",
    controller: 'ProductEditCtrl'
  });
});