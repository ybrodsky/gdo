gdoApp.controller('DashboardCtrl', function($scope, $window, globalVariables, $sce, Product, Sale, Client, moment, Comun, $uibModal, $stateParams, $state, $localStorage) {

  $scope.sales = [];
  $scope.filters = {
    createdAt: new Date()
  }

  $scope.findAll = () => {
    let query = {
      where: {
        createdAt: {
          '$gte': moment($scope.filters.createdAt).startOf('day'),
          '$lte': moment($scope.filters.createdAt).endOf('day'),
        },
        cancelled: 0
      },
      include: [{model: 'Product'}],
      order: 'id DESC'
    }

    Sale.query(query).$promise.then((results) => {
      $scope.sales = results;
      $scope.total = results.reduce((acc, s) => {
        return acc + s.total
      }, 0);
    })
  }

  $scope.removeSale = (sale) => {
    sale.cancelled = 1;
    Sale.update({id: sale.id}, sale).$promise.then(() => {
      Comun.toaster('success', 'Venta', 'La venta fue anulada');
      $scope.findAll();
    })
  }

  $scope.reset = () => {
	  $scope.sale = {
	    total: 0,
	    Products: [],
	    paid: false
	  }
    $scope.asyncSelected2 = null;
  }

  $scope.reset();
  $scope.findAll();

  $scope.create = () => {
  	$scope.sale.paid = !$scope.sale.paid;
  	let sale = new Sale($scope.sale);
  	sale.$save().then((created) => {
      Comun.toaster('success', 'Venta', 'La venta fue registrada');
      $scope.reset();
      $scope.findAll();
      $scope.form.$setPristine();
  	});
  }

  $scope.getProduct = function(query) {
  	return Product.query({
  		where: {name: {'$like': query + '%'}}
  	}).$promise.then((results) => {
  		return results;
  	})
  }

  $scope.getClient = (query) => {
		return Client.query({
  		where: {
  			'$or': [{
  				name: {'$like': query + '%'},
  			}, {
  				surname: {'$like': query + '%'}
  			}]
  		}
  	}).$promise.then((results) => {
  		return results;
  	})
  }

  $scope.selectedClient = (client) => {
  	$scope.sale.client_id = client.id;
  }

  $scope.selectedProduct = (product) => {
  	$scope.sale.Products.push(product);
  	$scope.sale.total += product.price;
  	$scope.asyncSelected = null;
  }

  $scope.removeProduct = (index) => {
  	$scope.sale.total -= $scope.sale.Products[index].price;
  	$scope.sale.Products.splice(index, 1);
  }
});