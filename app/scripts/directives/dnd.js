'use strict';

/**
 * @ngdoc directive
 * @name cloudFilesUiApp.directive:dnd
 * @description
 * # dnd
 */
angular.module('cloudFilesUiApp')
  .directive('dnd', function ($rootScope) {
    return {
      restrict: 'A',
      transclude: true,
      template: '<div class="drop-message" ng-transclude></div><div class="drop-overlay"></div>',
      link: function(scope, element, attrs){
        var body = angular.element(document.querySelector('body'));
        body.bind('dragover', function(e){
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.effectAllowed = 'copy';
          return false;
        });

        body.bind('dragenter', function(e){
          e.preventDefault();
          e.stopPropagation();
          body.addClass('drag-active');
          $rootScope.$broadcast('dragEnterEvent');
        });

        body.bind('drop', function(e){
          e.preventDefault();
          body.removeClass('drag-active');
          $rootScope.$broadcast('dragDropEvent',
            { files: e.dataTransfer.files });
        });
        element.addClass('drop-wrapper');
        element.bind('dragleave', function(e){
          e.preventDefault();
          e.stopPropagation();
          body.removeClass('drag-active');
          $rootScope.$broadcast('dragLeaveEvent');
        });
      }
    };
  });
