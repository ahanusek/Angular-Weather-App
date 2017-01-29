
//MODULE
const weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);



//ROUTES
weatherApp.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix('');

  $routeProvider

  .when('/', {
    templateUrl: 'pages/main.html',
    controller: 'mainController'
  })

  .when('/forecast', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })

  .when('/forecast/:days', {
    templateUrl: 'pages/forecast.html',
    controller: 'forecastController'
  })


});


//cityNameService


weatherApp.service('cityNameService', function() {

    cityName = "";

});

//mainController

weatherApp.controller('mainController', ['$scope', 'cityNameService', function($scope, cityNameService) {

  $scope.cityName = "";

  $scope.$watch('cityName', function() {
    cityNameService.cityName = $scope.cityName;
  })

}])


//forecastController

weatherApp.controller('forecastController', ['$scope', 'cityNameService' , '$http' ,'$routeParams', function($scope, cityNameService, $http, $routeParams) {

  $scope.name = cityNameService.cityName;

  $scope.days = $routeParams.days || '2'
  console.log($scope.days);
  $scope.toCelsius = function(value) {
    return Math.round(value - 273);
  }

  $scope.convertToDate = function(dt) {
    return new Date(dt*1000);
  }

  $http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${$scope.name}&cnt=${$scope.days}&APPID=c75de935da6e48f9df16b4fada175dc5`)
        .then(function(success) {
          $scope.weatherResult = success.data;
        }), function(failed) {
            consoloe.log(failed);
        };




}])

//DIRECTIVES

weatherApp.directive('forecastPanel', function() {
    return {
      restrict: 'AE',
      templateUrl: 'directives/forecastpanel.html',
      replace: true,
      scope: {
        weatherDay: '=',
        convertToStandard: '&',
        convertToDate: '&',
        dateFormat: '@'
      }
    }
})
