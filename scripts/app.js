angular.module("ngWineNotes", ["ui.router", "ngResource", "ngWineNotes.winesCtrl", "ngWineNotes.services"]);

angular.module("ngWineNotes").config(function($stateProvider, $httpProvider) {
  $stateProvider.state("wines", {
    url: "/wines",
    templateUrl: "partials/wines.html",
    controller: "WinesListCtrl"
  }).state('viewWine', {
      url: '/wines/:id/view',
      templateUrl: 'partials/wine-view.html',
      controller: 'WineViewController'
    }).state('newWine', {
      url: '/wines/new',
      templateUrl: 'partials/wine-add.html',
      controller: 'WineCreateController'
    }).state('editWine', {
      url: '/wines/:id/edit',
      templateUrl: 'partials/wine-edit.html',
      controller: 'WineEditController'
    });
}).run(function($state) {
  $state.go("wines");
  //$http.defaults.headers.common["token"] = '';
});
