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
        deferred1.resolve('Back from long request one.');
      }, 5000);

      return deferred1.promise;
    },
    requestTwo: function () {
      deferred2 = $q.defer();

      $timeout(function(){
        deferred2.resolve('Back from long request two.');
      }, 5000);

      return deferred2.promise;
    },
    requestThree: function () {
      deferred3 = $q.defer();

      $timeout(function(){
        deferred3.resolve('Back from long request three.');
      }, 5000);

      return deferred3.promise;
    },
    requestFour: function () {
      deferred4 = $q.defer();

      $timeout(function(){
        deferred4.resolve('Back from long request four.');
      }, 5000);

      return deferred4.promise;
    },
    requestFive: function () {
      deferred5 = $q.defer();

      $timeout(function(){
        deferred5.resolve('Back from long request five.');
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
        deferred1.resolve('Back from short request one.');
      }, 1000);

      return deferred1.promise;
    },
    requestTwo: function () {
      deferred2 = $q.defer();

      $timeout(function(){
        deferred2.resolve('Back from short request two.');
      }, 1000);

      return deferred2.promise;
    },
    requestThree: function () {
      deferred3 = $q.defer();

      $timeout(function(){
        deferred3.resolve('Back from short request three.');
      }, 1000);

      return deferred3.promise;
    },
    requestFour: function () {
      deferred4 = $q.defer();

      $timeout(function(){
        deferred4.resolve('Back from short request four.');
      }, 1000);

      return deferred4.promise;
    },
    requestFive: function () {
      deferred5 = $q.defer();

      $timeout(function(){
        deferred5.resolve('Back from short request five.');
      }, 1000);

      return deferred5.promise;
    },

  };
  return helper;
}]);

app.controller('myController', ['$scope', 'longRunningService', 'shortRunningService', function ($scope, longRunningService, shortRunningService) {
  $scope.messages = ['loading...'];
  $scope.loadResult = function(){
    $scope.handleResult('Calling Long Running Service');
    longRunningService.requestOne().then(function(result){
        $scope.handleResult(result);
        return longRunningService.requestTwo();
    }).then(function(result){
      $scope.handleResult(result);
      return longRunningService.requestThree();
    }).then(function(result){
      $scope.handleResult(result);
      return longRunningService.requestFour();
    }).then(function(result){
      $scope.handleResult(result);
      return longRunningService.requestFive();
    }).then(function(result){
      $scope.handleResult(result);
    }).then(function(){
      $scope.handleResult('Calling Short Running Service');
      return shortRunningService.requestOne();
    }).then(function(result){
      $scope.handleResult(result);
      return shortRunningService.requestTwo();
    }).then(function(result){
      $scope.handleResult(result);
      return shortRunningService.requestThree();
    }).then(function(result){
      $scope.handleResult(result);
      return shortRunningService.requestFour();
    }).then(function(result){
      $scope.handleResult(result);
      return shortRunningService.requestFive();
    }).finally(function(){
      $scope.handleResult('All requests complete.')
    });
  };
  $scope.handleResult = function(result){
    $scope.messages.push(result);
  };
}]);
