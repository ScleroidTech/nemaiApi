
var app = angular.module('products', []);

app.controller('productCTRL', function ($scope, $http) {
    
  
	//destinationapi
	 $scope.destApi = function () {
        
        $scope.loader.loading = true;
        
        $http.post('/api/dest', {
			  'origins' : $scope.origins,
            'destinations' : $scope.destinations
            
          	
        })
            .success(function (data, status, headers, config) {
                // close modal
			alert('success');
            })
           
    };
	

});