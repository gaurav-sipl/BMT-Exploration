/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */
(function () {
  var homer =  angular.module('homer', [
        'ui.router',                // Angular flexible routing
        'ui.bootstrap',             // AngularJS native directives for Bootstrap
        'gridshore.c3js.chart',      // c3 angular charts
        'ngTable',      // for ng data table
        'toaster', // for toaster Messages
        
        //'ngStorage',    // for local storage
    ]);

    //define interceptor to handle http request
/*function routeInterceptor($q, $location, $localStorage) {
  return {
    request: function(config) {
    	
    	//check if we want to allow interceptor to check request if ("i" not exits in url)
    	if (  config.url.indexOf('i') === -1) {
    		
    		//check if current user is active
    		if($localStorage.loggedIn == false)
    			$location.path('/login');
    		else if($localStorage.loggedIn == true && $location.$$path == '/login')
    			$location.path('/dashboard');
    		else if($localStorage.loggedIn == true){
    			
    		}
    		else
    			$location.path('/login');
        }       
    	return config;
    },
    //if error occure on sending request to server
    requestError: function(config) {
    	
    	$location.path('/login');
    	return config;
    },
    //check response 
    response: function(res) {
    	
      return res;
    },

    //if error occur on receiving response for server
    responseError: function(res) {
    
      return res;
    }
  }
  
}*/

//add interceptor
//homer.factory('routeInterceptor', routeInterceptor);
})();

