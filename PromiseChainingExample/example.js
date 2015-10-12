'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []);

app.factory('longRunningService', ['$q', '$timeout', function ($q, $timeout)
{
  var deferred;
  var helper   = {
    longRunningRequest: function () {
      deferred = $q.defer();

      $timeout(function(){
        deferred.resolve('Back From A Long Running Process');
      }, 10000);

      return deferred.promise;
    },

    alwaysFailsRequest: function () {
      deferred = $q.defer();

      $timeout(function(){
        deferred.reject('I always fail!');
      }, 10000);

      return deferred.promise;
    }
  };
  return helper;
}]);

app.controller('myController', ['$scope', 'longRunningService', function ($scope, longRunningService) {
  $scope.result = 'loading...';
  $scope.loadResult = function(){
    longRunningService.longRunningRequest().then(function(result){
      $scope.result = result;
    }, function(error){
      $scope.result = error;
    });
  };
  $scope.loadFailure = function(){
    longRunningService.alwaysFailsRequest().then(function(result){
      $scope.result = result;
    }, function(error){
      $scope.result = error;
    });
  };
}]);
