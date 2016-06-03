(function() {
  "use strict";

  function authInterceptor(API, auth) {
    return {
      // automatically attach Authorization header
      request: function(config) {
        var token = auth.getToken();
        if(config.url.indexOf(API) === 0 && token) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      },

      // If a token was sent back, save it
      response: function(res) {
        if(res.config.url.indexOf(API) === 0 && res.data.token) {
          auth.saveToken(res.data.token);
        }

        return res;
      },
    }
  }

  function authService($window) {
    var self = this;

    self.parseJwt = function(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse($window.atob(base64));
    }

    self.saveToken = function(token) {
      $window.localStorage['jwtToken'] = token;
    }

    self.getToken = function() {
      return $window.localStorage['jwtToken'];
    }

    self.isAuthed = function() {
      var token = self.getToken();
      if(token) {
        var params = self.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }

    self.logout = function() {
      $window.localStorage.removeItem('jwtToken');
    }
  }

  function userService($http, API, auth) {
    var self = this;

    self.login = function(email, password) {
      return $http.post(API + '/authenticate', {
        email: email,
        password: password
      })
    };

  }

  function AuthCtrl(user, auth) {
    var self = this;

    self.login = function() {
      user.login(self.email, self.password);
    }

    self.logout = function() {
      auth.logout && auth.logout();
    }
    self.isAuthed = function() {
      return auth.isAuthed ? auth.isAuthed() : false;
    }
  }

  angular.module('ngWineNotes.auth', [])
    .factory('authInterceptor', authInterceptor)
    .service('user', userService)
    .service('auth', authService)
    .constant('API', 'http://localhost:3000')
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })
    .controller('AuthCtrl', AuthCtrl);
})();
