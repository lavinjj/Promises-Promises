'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', []);

app.factory('longRunningService', ['$q', '$timeout', function ($q, $timeout) {
    var deferred1, deferred2, deferred3, deferred4, deferred5;
    var helper = {
        requestOne: function () {
            deferred1 = $q.defer();

            $timeout(function () {
                var result = Math.floor(Math.random() * (10 - 1)) + 1;
                deferred1.resolve(result);
            }, 5000);

            return deferred1.promise;
        }
    };
    return helper;
}]);


app.controller('myController', ['$scope', 'longRunningService', function ($scope, longRunningService) {
    $scope.messages = ['Press button below to start'];
    $scope.result = 0;

    $scope.loadResult = function () {
        $scope.result = 0;
        $scope.messages = [];
        $scope.handleResult('Calling Long Running Service');
        longRunningService.requestOne().then(function (result) {
            console.log('returned result is ' + result);
            return result * 10;
        }).then(function (result) {
            $scope.result = result;
        }).finally(function () {
            $scope.handleResult('All requests complete.');
            $scope.handleResult('Total = ' + $scope.result);
        });
    };
    $scope.handleResult = function (result) {
        $scope.messages.push(result);
    };
}]);
