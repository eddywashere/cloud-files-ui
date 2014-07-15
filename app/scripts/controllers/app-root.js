'use strict';

angular.module('cloudFilesUiApp')
  .controller('AppRootCtrl', function ($rootScope, $scope, $window) {
    $scope.user = $window.user;
  });
