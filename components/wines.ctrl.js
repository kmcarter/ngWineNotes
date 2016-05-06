(function() {
  "use strict";

  angular
    .module("ngWineNotes.winesCtrl", [])
    .controller("WinesListCtrl", function($scope, $stateParams, Wine) {
      $scope.wines = Wine.query();
    });
})();
