(function() {
    'use strict';
    /**
     * Employee Controller
     */

angular
    .module('homer')
    .controller('EmployeeListCtrl', EmployeeListCtrl);

EmployeeListCtrl.$inject = ['$scope', 'EmployeeFactory','NgTableParams'];
function EmployeeListCtrl($scope, EmployeeFactory, NgTableParams) {

var vm = this; 
vm.getListing = getListing;
/*vm.getListing = getList;
    	function getList(){
    		vm.list = EmployeeFactory.getListing();
    	}
 vm.getList();*/


function getListing() {
            //Call employees factory get all employees data
            EmployeeFactory
                .getListing()
                .then(function () {
                    vm.employees = EmployeeFactory.employees;
                    //console.log(vm.employees);
                    //vm.tangoTableParams = UtilsFactory.tangoTableOptions(vm.employees);
                    vm.tableParams = new NgTableParams({}, { dataset: vm.employees});
                   
                });

                
        }

vm.cancel = cancel;
vm.del = del;
vm.save = save;

    //////////

function cancel(employee, rowForm) {
  var originalRow = resetRow(employee, rowForm);
  angular.extend(employee, originalRow);
}

function del(employee) {
      _.remove(vm.tableParams.settings().dataset, function(item) {
        return employee === item;
});
vm.tableParams.reload().then(function(data) {
        if (data.length === 0 && vm.tableParams.total() > 0) {
          vm.tableParams.page(vm.tableParams.page() - 1);
          vm.tableParams.reload();
        }
      });
}
    
function resetRow(employee, rowForm){
      employee.isEditing = false;
      rowForm.$setPristine();
      vm.tableTracker.untrack(employee);
      return _.findWhere(originalData, function(r){
        return r.id === employee.id;
      });
}

function save(employee, rowForm) {
      var originalRow = resetRow(employee, rowForm);
      angular.extend(originalRow, employee);
}

vm.getListing();


}
})();

// Directive/////////////////////

(function() {
  angular.module("homer").directive("demoTrackedTable", demoTrackedTable);

  demoTrackedTable.$inject = [];

  function demoTrackedTable() {
    return {
      restrict: "A",
      priority: -1,
      require: "ngForm",
      controller: demoTrackedTableController
    };
  }

  demoTrackedTableController.$inject = ["$scope", "$parse", "$attrs", "$element"];

  function demoTrackedTableController($scope, $parse, $attrs, $element) {
    var self = this;
    var tableForm = $element.controller("form");
    var dirtyCellsByRow = [];
    var invalidCellsByRow = [];

    init();

    ////////

    function init() {
      var setter = $parse($attrs.demoTrackedTable).assign;
      setter($scope, self);
      $scope.$on("$destroy", function() {
        setter(null);
      });

      self.reset = reset;
      self.isCellDirty = isCellDirty;
      self.setCellDirty = setCellDirty;
      self.setCellInvalid = setCellInvalid;
      self.untrack = untrack;
    }

    function getCellsForRow(employee, cellsByRow) {
      return _.find(cellsByRow, function(entry) {
        return entry.employee === employee;
      })
    }

    function isCellDirty(employee, cell) {
      var rowCells = getCellsForRow(employee, dirtyCellsByRow);
      return rowCells && rowCells.cells.indexOf(cell) !== -1;
    }

    function reset() {
      dirtyCellsByRow = [];
      invalidCellsByRow = [];
      setInvalid(false);
    }

    function setCellDirty(employee, cell, isDirty) {
      setCellStatus(employee, cell, isDirty, dirtyCellsByRow);
    }

    function setCellInvalid(employee, cell, isInvalid) {
      setCellStatus(employee, cell, isInvalid, invalidCellsByRow);
      setInvalid(invalidCellsByRow.length > 0);
    }

    function setCellStatus(employee, cell, value, cellsByRow) {
      var rowCells = getCellsForRow(employee, cellsByRow);
      if (!rowCells && !value) {
        return;
      }

      if (value) {
        if (!rowCells) {
          rowCells = {
            employee: employee,
            cells: []
          };
          cellsByRow.push(rowCells);
        }
        if (rowCells.cells.indexOf(cell) === -1) {
          rowCells.cells.push(cell);
        }
      } else {
        _.remove(rowCells.cells, function(item) {
          return cell === item;
        });
        if (rowCells.cells.length === 0) {
          _.remove(cellsByRow, function(item) {
            return rowCells === item;
          });
        }
      }
    }

    function setInvalid(isInvalid) {
      self.$invalid = isInvalid;
      self.$valid = !isInvalid;
    }

    function untrack(employee) {
      _.remove(invalidCellsByRow, function(item) {
        return item.employee === employee;
      });
      _.remove(dirtyCellsByRow, function(item) {
        return item.employee === employee;
      });
      setInvalid(invalidCellsByRow.length > 0);
    }
  }
})();

