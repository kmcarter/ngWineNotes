angular.module("ngWineNotes", ["ui.router", "ngResource", "ngWineNotes.winesCtrl", "ngWineNotes.services"]);

angular.module("ngWineNotes").config(function($stateProvider, $httpProvider) {
  $stateProvider.state("wines", {
    url: "/wines",
    templateUrl: "partials/wines.html",
    controller: "WinesListCtrl"
  });
}).run(function($state) {
  $state.go("wines");
  //$http.defaults.headers.common["token"] = '';
});
