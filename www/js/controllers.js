angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope,$cordovaCamera, $cordovaFile) {

    $scope.getPhoto = function () {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 1024,
        targetHeight: 768,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      uploadPicture(options);

    };

    $scope.takePhoto = function () {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 1024,
        targetHeight: 768,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      uploadPicture(options);

    };


    function uploadPicture(options) {
      $cordovaCamera.getPicture(options).then(function (sourcePath) {
        var sourceDirectory = sourcePath.substring(0, sourcePath.lastIndexOf('/') + 1);
        var sourceFileName = sourcePath.substring(sourcePath.lastIndexOf('/') + 1, sourcePath.length);
        sourceFileName = sourceFileName.split('?')[0];
        $cordovaFile.copyFile(sourceDirectory, sourceFileName, cordova.file.dataDirectory, sourceFileName).then(function (success) {
          $scope.event.image = cordova.file.dataDirectory + sourceFileName;
        }, function (error) {
          console.log(error);
        });

      }, function (err) {
        console.log(err);
      });
    };

  });

