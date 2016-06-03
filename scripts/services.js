angular.module('ngWineNotes.services', []).factory('Wine', function($resource) {
  return $resource("http://localhost:3000/wines/");
}).service('popupService', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  }
});
