(function() {
    'use strict';

function ListingCtrl() {

}

angular.module('homer').component('employeeList', {
  //templateUrl: 'employeeList.html',
  template: '<table class="table"><thead><tr><th>First Name</th><th>Last Name</th></tr></thead><tbody><tr ng-repeat="employee in $ctrl.ed"><td>{{employee.first_name}}</td><td>{{employee.last_name}}</td></tr></tbody></table>',
  controller: ListingCtrl,
  bindings: {
    ed: '='
  }
});
  
  })();