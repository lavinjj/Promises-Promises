'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []);

app.factory('longRunningService', ['$q', '$timeout', function ($q, $timeout)
{
  var deferred1, deferred2, deferred3, deferred4, deferred5;
  var helper   = {
    requestOne: function () {
      deferred1 = $q.defer();

      $timeout(function(){
        deferred1.resolve(1);
      }, 5000);

      return deferred1.promise;
    },
    requestTwo: function () {
      deferred2 = $q.defer();

      $timeout(function(){
        deferred2.resolve(2);
      }, 5000);

      return deferred2.promise;
    },
    requestThree: function () {
      deferred3 = $q.defer();

      $timeout(function(){
        deferred3.resolve(3);
      }, 5000);

      return deferred3.promise;
    },
    requestFour: function () {
      deferred4 = $q.defer();

      $timeout(function(){
        deferred4.resolve(4);
      }, 5000);

      return deferred4.promise;
    },
    requestFive: function () {
      deferred5 = $q.defer();

      $timeout(function(){
        deferred5.resolve(5);
      }, 5000);

      return deferred5.promise;
    },

  };
  return helper;
}]);

app.factory('shortRunningService', ['$q', '$timeout', function ($q, $timeout)
{
  var deferred1, deferred2, deferred3, deferred4, deferred5;
  var helper   = {
    requestOne: function () {
      deferred1 = $q.defer();

      $timeout(function(){
        deferred1.resolve(1);
      }, 1000);

      return deferred1.promise;
    },
    requestTwo: function () {
      deferred2 = $q.defer();

      $timeout(function(){
        deferred2.resolve(2);
      }, 1000);

      return deferred2.promise;
    },
    requestThree: function () {
      deferred3 = $q.defer();

      $timeout(function(){
        deferred3.resolve(3);
      }, 1000);

      return deferred3.promise;
    },
    requestFour: function () {
      deferred4 = $q.defer();

      $timeout(function(){
        deferred4.resolve(4);
      }, 1000);

      return deferred4.promise;
    },
    requestFive: function () {
      deferred5 = $q.defer();

      $timeout(function(){
        deferred5.resolve(5);
      }, 1000);

      return deferred5.promise;
    },

  };
  return helper;
}]);

app.controller('myController', ['$scope', 'longRunningService', 'shortRunningService', function ($scope, longRunningService, shortRunningService) {
  $scope.messages = ['Press button below to start'];
  $scope.result = 0;

  $scope.loadResult = function(){
    $scope.result = 0;
    $scope.messages = [];
    $scope.handleResult('Calling Long Running Service');
    longRunningService.requestOne().then(function(result){
        $scope.result += result;
        return longRunningService.requestTwo();
    }).then(function(result){
      $scope.result += result;
      return longRunningService.requestThree();
    }).then(function(result){
      $scope.result += result;
      return longRunningService.requestFour();
    }).then(function(result){
      $scope.result += result;
      return longRunningService.requestFive();
    }).then(function(result){
      $scope.result += result;
    }).then(function(){
      $scope.handleResult('Calling Short Running Service');
      return shortRunningService.requestOne();
    }).then(function(result){
      $scope.result += result;
      return shortRunningService.requestTwo();
    }).then(function(result){
      $scope.result += result;
      return shortRunningService.requestThree();
    }).then(function(result){
      $scope.result += result;
      return shortRunningService.requestFour();
    }).then(function(result){
      $scope.result += result;
      return shortRunningService.requestFive();
    }).then(function(result){
      $scope.result += result;
    }).finally(function(){
      $scope.handleResult('All requests complete.');
      $scope.handleResult('Total = ' + $scope.result);
    });
  };
  $scope.handleResult = function(result){
    $scope.messages.push(result);
  };
}]);
