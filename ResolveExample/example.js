'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['ngRoute']);

app.provider('resolveService', function () {

    var helper = {
        $get: function($q, $timeout) {
            var deferred1;

            var requestOne = function () {
                deferred1 = $q.defer();

                $timeout(function () {
                    var result = Math.floor(Math.random() * (10 - 1)) + 1;
                    deferred1.resolve(result);
                }, 5000);

                return deferred1.promise;
            };

            var service = {
                requestOne: requestOne
            };

            return service;
        }
    };

    return helper;
});

app.controller('Controller1', function ($scope, $location) {
    $scope.message = 'Press button below to start';
    $scope.result = 0;

    $scope.loadResult = function () {
        $location.path('/view2');
    };
});

app.controller('Controller2', function ($scope, result) {
    $scope.result = result;
});

app.config(function($routeProvider, resolveServiceProvider){
    $routeProvider
        .when('/view1', {
            templateUrl: 'view1.html',
            controller: 'Controller1'
        })
        .when('/view2', {
            templateUrl: 'view2.html',
            controller: 'Controller2',
            resolve: {
                result: function(resolveService){
                    return resolveService.requestOne();
                }
            }
        }).otherwise({redirectTo: '/view1'});
});

