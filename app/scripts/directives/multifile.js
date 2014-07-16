'use strict';

/**
 * @ngdoc directive
 * @name cloudFilesUiApp.directive:multifile
 * @description
 * # multifile
 */
angular.module('cloudFilesUiApp')
  .directive('multifile', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {

        var modelGet = $parse(attrs.multifile);
        var modelSet = modelGet.assign;
        var onChange = $parse(attrs.onChange);
        var updateModel = function () {
          scope.$apply(function () {
            modelSet(scope, element[0].files);
            onChange(scope);
          });
        };

        element.bind('change', updateModel);
      }
    };
  });
