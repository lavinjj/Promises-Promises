'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []);

app.factory('longRunningService', ['$q', '$timeout', function ($q, $timeout) {
  var deferred1, deferred2, deferred3, deferred4, deferred5;
  var helper = {
    requestOne: function () {
      deferred1 = $q.defer();

      $timeout(function () {
        deferred1.resolve('Back from long request one.');
      }, 5000);

      return deferred1.promise;
    },
    requestTwo: function () {
      deferred2 = $q.defer();

      $timeout(function () {
        deferred2.resolve('Back from long request two.');
      }, 5000);

      return deferred2.promise;
    },
    requestThree: function () {
      deferred3 = $q.defer();

      $timeout(function () {
        deferred3.resolve('Back from long request three.');
      }, 5000);

      return deferred3.promise;
    },
    requestFour: function () {
      deferred4 = $q.defer();

      $timeout(function () {
        deferred4.resolve('Back from long request four.');
      }, 5000);

      return deferred4.promise;
    },
    requestFive: function () {
      deferred5 = $q.defer();

      $timeout(function () {
        deferred5.resolve('Back from long request five.');
      }, 5000);

      return deferred5.promise;
    },

  };
  return helper;
}]);

app.factory('shortRunningService', ['$q', '$timeout', function ($q, $timeout) {
  var deferred1, deferred2, deferred3, deferred4, deferred5;
  var helper = {
    requestOne: function () {
      deferred1 = $q.defer();

      $timeout(function () {
        deferred1.resolve('Back from short request one.');
      }, 1000);

      return deferred1.promise;
    },
    requestTwo: function () {
      deferred2 = $q.defer();

      $timeout(function () {
        deferred2.resolve('Back from short request two.');
      }, 1000);

      return deferred2.promise;
    },
    requestThree: function () {
      deferred3 = $q.defer();

      $timeout(function () {
        deferred3.resolve('Back from short request three.');
      }, 1000);

      return deferred3.promise;
    },
    requestFour: function () {
      deferred4 = $q.defer();

      $timeout(function () {
        deferred4.resolve('Back from short request four.');
      }, 1000);

      return deferred4.promise;
    },
    requestFive: function () {
      deferred5 = $q.defer();

      $timeout(function () {
        deferred5.resolve('Back from short request five.');
      }, 1000);

      return deferred5.promise;
    },

  };
  return helper;
}]);

app.controller('myController', ['$scope', '$q', 'longRunningService', 'shortRunningService', function ($scope, $q, longRunningService, shortRunningService) {
  $scope.messages = ['Press button below to start'];
  $scope.promises = [];
  $scope.loadResult = function () {
    $scope.messages = [];
    $scope.handleResult('Calling Both Services - All Methods');
    $scope.promises.push(longRunningService.requestOne());
    $scope.promises.push(longRunningService.requestTwo());
    $scope.promises.push(longRunningService.requestThree());
    $scope.promises.push(longRunningService.requestFour());
    $scope.promises.push(longRunningService.requestFive());
    $scope.promises.push(shortRunningService.requestOne());
    $scope.promises.push(shortRunningService.requestTwo());
    $scope.promises.push(shortRunningService.requestThree());
    $scope.promises.push(shortRunningService.requestFour());
    $scope.promises.push(shortRunningService.requestFive());

    $q.all($scope.promises).then(function (results) {
      angular.forEach(results, function (result) {
        $scope.handleResult(result);
      });
    });
  };
  $scope.handleResult = function (result) {
    $scope.messages.push(result);
  };
}]);
