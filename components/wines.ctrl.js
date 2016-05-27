(function() {
  "use strict";

  angular
    .module("ngWineNotes.winesCtrl", [])
    .controller("WinesListCtrl", function($scope, $stateParams, popupService, $window, Wine) {
      $scope.wines = Wine.query();

      $scope.deleteWine = function(wine) {
        if (popupService.showPopup('Are you sure you want to delete this wine?')) {
          wine.$delete(function() {
            $window.location.href = '';
          });
        }
      };
    }).controller('WineViewController', function($scope, $stateParams, Wine) {
      $scope.wine = Wine.get({ id: $stateParams.id });
    }).controller('WineCreateController', function($scope, $state, $stateParams, Wine) {
      $scope.wine = new Wine();

      $scope.addWine = function() {
        $scope.wine.$save(function() {
          $state.go('wines');
        });
      };
    }).controller('WineEditController', function($scope, $state, $stateParams, Wine) {
      $scope.updateWine = function() {
        $scope.wine.$update(function() {
          $state.go('wines');
        });
      };

      $scope.loadWine = function() {
        $scope.wine = Wine.get({ id: $stateParams.id });
      };

      $scope.loadWine();
    });
})();
