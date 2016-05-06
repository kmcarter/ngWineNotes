angular.module('ngWineNotes.services', []).factory('Wine', function($resource) {
  return $resource("http://localhost:3000/wines/:id");
});
