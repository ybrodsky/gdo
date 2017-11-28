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
  });
});