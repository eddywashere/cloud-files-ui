'use strict';

/**
 * @ngdoc service
 * @name cloudFilesUiApp.CloudFiles
 * @description
 * # CloudFiles
 * Factory in the cloudFilesUiApp.
 */
angular.module('cloudFilesUiApp')
  .factory('CloudFiles', function ($resource, $q) {
    // Service logic
    // ...
    var CloudFiles = {};
    var Container = $resource('/proxy/cloudFiles:cdn,:region/:container',
      {
        container: '@container',
        region: '@region',
        cdn: '@cdn'
      },
      {
        'query': {
          method: 'GET',
          isArray: false,
          transformResponse: function(data, headers){
            var newData = {
              values: JSON.parse(data),
              tempUrlKey: headers('x-account-meta-temp-url-key')
            };

            return newData;
          }
        }
      }
    );

    // CloudFiles.getContainers= function(region, container) {
    //   var options = {
    //     region: region
    //   };
    //   if(container){
    //     options.container = container;
    //   }

    //   return Container.query(options).$promise;
    // };

    CloudFiles.getContainers = function(region, container) {
      var cdnOptions,
      requests = [],
      options = {
        region: region
      };
      if(container){
        options.container = container;
      }
      requests.push(Container.query(options).$promise);
      cdnOptions = angular.copy(options);
      cdnOptions.cdn = 'CDN';
      requests.push(Container.query(cdnOptions).$promise);
      return $q.all(requests);
    };

    // Public API here
    return CloudFiles;
  });
