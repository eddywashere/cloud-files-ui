'use strict';

/**
 * @ngdoc function
 * @name cloudFilesUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cloudFilesUiApp
 */
angular.module('cloudFilesUiApp')
  .controller('MainCtrl', function ($scope, $http, CloudFiles) {
    $scope.$on('dragEnterEvent', function(){
      console.log('caught DRAG broadcasted from $rootScope');
    });

    $scope.containers = [];
    $scope.region = 'DFW';

    CloudFiles.getContainers($scope.region).then(function(data){
      console.log(data[0]);
      $scope.containers = _.indexBy(data[0].values, 'name');
      $scope.cdn = _.indexBy(data[1].values, 'name');
    });

    $scope.$on('dragDropEvent', function(e, data){
      if (data.files){
        for (var i = 0, f; f = data.files[i]; i++) {
          // Read the File objects in this FileList.
          filereader(f);
          console.log(f);
        }
      }
    });

    var key = 'fzwhJKRGv2oAYBd6ZA7xCWUjTzmihrishnxEsmkaAuosgsUb';
    var url = 'https://storage101.ord1.clouddrive.com';
    var path = '/v1/MossoCloudFS_abceef3b-a122-477a-add4-84fa9664377b/uploads/a-';

    $scope.foo = [];
    $scope.custom = function(e){
      //console.log($scope.foo[0]);
      angular.forEach($scope.foo, function(file){
        console.log(file);
        filereader(file);
      });
    };

    function fileuploader(name, file) {
      var expires = Math.round(new Date() / 1000) + 30;
      var method = 'PUT';

      var hash = CryptoJS.HmacSHA1(
        method + '\n' + expires + '\n' + path + name,
        key);
      var signature = hash.toString();

      var uploadUrl = url+path+name+ '?temp_url_sig=' + signature + '&temp_url_expires=' + expires;
      console.log(file);
      $http.put(uploadUrl, file, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function(data){
        console.log(data);
      })
      .error(function(){

      });
    }

    function filereader(file) {
      var name = file.name;
      var fr = new FileReader();
      fr.onload = function(e) {
        fileuploader(name, fr.result);
      };
      fr.readAsArrayBuffer(file);
    }
  });
