(function() {
    'use strict';
    /**
     * Employee Controller
     */

angular
    .module('homer')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', '$location','toaster'];
function LoginCtrl($scope, $location, toaster) {

var vm = this; 
 vm.login = function(userName, password) {
            //Call factories login to validate login
            if(userName == 'user@gmail.com' && password == 'pass'){
            	$location.path('/dashboard');
            }else if(userName == '' || userName != 'user@gmail.com'){
                toaster.pop('warning', "Email is Required", "Please Enter Correct Email address");
            }else{
                toaster.pop('error', "Email or Password incorrent", "Please Enter a valid Email and Password");
            }
        }

}
})();