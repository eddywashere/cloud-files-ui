'use strict';

/**
 * @ngdoc overview
 * @name cloudFilesUiApp
 * @description
 * # cloudFilesUiApp
 *
 * Main module of the application.
 */
angular
  .module('cloudFilesUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ui.gravatar',
    'templates-main'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function (gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 200,
      'default': 'mm'
    };

    gravatarServiceProvider.secure = true;
  });
