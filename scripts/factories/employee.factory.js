(function() {
    'use strict';
    /**
     * Employee Factory
     */

    angular
        .module('homer')
        .factory('EmployeeFactory', EmployeeFactory)
        
        
   EmployeeFactory.$inject = ['$http','$q'];
    function EmployeeFactory($http, $q)
    {
        
     
     var  empDataServices = {
        employees: [],
            /*employees:[{
                    first_name: 'Gaurav',
                    last_name: 'Joshi',
                    age: 26
                },
                {
                    first_name: 'Ajay',
                    last_name: 'Kurmi',
                    age: 30
                },
                {
                    first_name: 'Tapish',
                    last_name: 'Choudhary',
                    age: 30
                },  
            ],*/


            /**
             * @Employee getListing
             */
           getListing : function() {
              return $http({
                method : "GET",
                url : "employeeList.json"
              }).then(function mySucces(response) {
                //console.log(response.data);
                //console.log(response);
                  empDataServices.employees = response.data;
                }, function myError(response) {
                  empDataServices.employees = "Something went wrong";;
              });
          },



        };

      return empDataServices;
    }
})();