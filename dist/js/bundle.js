'use strict';

// Start: This is App JS =======================================================
var AA = angular.module('appNoServer', []);

// AA.config(function($momentProvider){
//   $momentProvider
//     .asyncLoading(false)
//     .scriptUrl('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js');
// });
// End: This is App JS =========================================================
'use strict';

// Start: This is the main controller ==========================================
AA.controller('mainCtrl', function ($scope, weatherService) {

  $scope.getCurrentWeather = function () {
    var promise = weatherService.getCurrentWeather();
    return promise.then(function (response) {
      return $scope.getWeather(response);
    });
  }();

  $scope.getWeather = function (city) {
    return weatherService.getWeather(city).then(function (response) {
      $scope.weather = response;
      $scope.temp = (response.main.temp * (9 / 5) - 459.67).toFixed(1) + '°';
      $scope.speed = 'wind: ' + response.wind.speed + ' mph';

      $scope.icon = response.weather[0].description;

      switch ($scope.icon) {
        case 'clear sky':
          $scope.icon = '../img/1d.svg';
          break;
        case 'few clouds':
          $scope.icon = '../img/2d.svg';
          break;
        case 'scattered clouds':
          $scope.icon = '../img/3d.svg';
          break;
        case 'broken clouds':
          $scope.icon = '../img/4d.svg';
          break;
        case 'shower rain':
          $scope.icon = '../img/9d.svg';
          break;
        case 'rain':
        case 'drizzle':
        case 'light rain':
          $scope.icon = '../img/10d.svg';
          break;
        case 'thunderstorm':
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
        case 'light thunderstorm':
        case 'heavy thunderstorm':
        case 'ragged thunderstorm':
        case 'thunderstorm with light drizzle':
        case 'thunderstorm with drizzle':
        case 'thunderstorm with heavy drizzle':
          $scope.icon = '../img/11d.svg';
          break;
        case 'snow':
        case 'light snow':
        case 'heavy snow':
        case 'sleet':
        case 'shower sleet':
        case 'light rain and snow':
        case 'rain and snow':
        case 'light shower snow':
        case 'shower snow':
        case 'heavy shower snow':
          $scope.icon = '../img/13d.svg';
          break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'sand, dust whirls':
        case 'fog':
        case 'sand':
        case 'dust':
        case 'volcanic ash':
        case 'squalls':
        case 'tornado':
          $scope.icon = '../img/50d.svg';
          break;
        default:
          $scope.icon = '../img/default.svg';
      }
    });
  };
});
// End: This is the main controller ============================================
'use strict';

// Start: This is the main controller ==========================================
//var moment = require('moment');

AA.controller('mainCtrl', function ($scope, weatherService) {

  // If didn't set asyncLoading angular-momentjs
  // will assume you provided moment.js
  // $scope.time = $moment("20111031", "YYYYMMDD").fromNow();
  //
  // // If you set asyncLoading to true then angular-momentjs
  // // will inject the script and return a promise
  // $moment.then(function(moment) {
  //   $scope.anotherTime = moment("20111031", "YYYYMMDD").fromNow();
  //   console.log('moment js', $scope.anotherTime);
  // })

  $scope.getCurrentWeather = function () {
    var promise = weatherService.getCurrentWeather();
    return promise.then(function (response) {
      return $scope.getWeather(response);
    });
  }();

  $scope.getWeather = function (city) {
    return weatherService.getWeather(city).then(function (response) {
      //console.log(response, "return response");
      $scope.weather = response;
      $scope.temp = (response.list[0].main.temp * (9 / 5) - 459.67).toFixed(1) + '°';
      $scope.speed = 'wind: ' + response.list[0].wind.speed + ' mph';

      $scope.fiveDays = [];
      for (var i = 3; i < 43; i += 8) {
        response.list[i].main.temp = (response.list[i].main.temp * (9 / 5) - 459.67).toFixed(1) + '°';
        response.list[i].wind.speed = 'wind: ' + response.list[0].wind.speed + ' mph';
        response.list[i].weather[0].icon = response.list[i].weather[0].description;
        $scope.fiveDays.push(response.list[i]);
        //console.log('These are five days:', $scope.fiveDays);

        switch (response.list[i].weather[0].icon) {
          case 'clear sky':
            response.list[i].weather[0].icon = '../img/1d.svg';
            break;
          case 'few clouds':
            response.list[i].weather[0].icon = '../img/2d.svg';
            break;
          case 'scattered clouds':
            response.list[i].weather[0].icon = '../img/3d.svg';
            break;
          case 'broken clouds':
            response.list[i].weather[0].icon = '../img/4d.svg';
            break;
          case 'shower rain':
            response.list[i].weather[0].icon = '../img/9d.svg';
            break;
          case 'rain':
          case 'drizzle':
          case 'light rain':
            response.list[i].weather[0].icon = '../img/10d.svg';
            break;
          case 'thunderstorm':
          case 'thunderstorm with light rain':
          case 'thunderstorm with rain':
          case 'thunderstorm with heavy rain':
          case 'light thunderstorm':
          case 'heavy thunderstorm':
          case 'ragged thunderstorm':
          case 'thunderstorm with light drizzle':
          case 'thunderstorm with drizzle':
          case 'thunderstorm with heavy drizzle':
            response.list[i].weather[0].icon = '../img/11d.svg';
            break;
          case 'snow':
          case 'light snow':
          case 'heavy snow':
          case 'sleet':
          case 'shower sleet':
          case 'light rain and snow':
          case 'rain and snow':
          case 'light shower snow':
          case 'shower snow':
          case 'heavy shower snow':
            response.list[i].weather[0].icon = '../img/13d.svg';
            break;
          case 'mist':
          case 'smoke':
          case 'haze':
          case 'sand, dust whirls':
          case 'fog':
          case 'sand':
          case 'dust':
          case 'volcanic ash':
          case 'squalls':
          case 'tornado':
            response.list[i].weather[0].icon = '../img/50d.svg';
            break;
          default:
            response.list[i].weather[0].icon = '../img/default.svg';
        }
      }
    });
  };
});
// End: This is the main controller ============================================
'use strict';

// Start: This is the current data directive ===================================
AA.directive('currentDataDirective', function () {

  return {
    restrict: 'E',
    templateUrl: './../views/current-data.html',
    controller: 'mainCtrl'
  };
});
// End: This is the current data directive =====================================
'use strict';

// Start: This is the current 5 day directive ==================================
AA.directive('currentFiveDayDirective', function () {

  return {
    restrict: 'E',
    templateUrl: './../views/current-five-day.html',
    controller: 'mainCtrl'
  };
});
// End: This is the current 5 day directive ====================================
'use strict';

// Start: This is the footer directive =========================================
AA.directive('footerDirective', function () {

  return {
    restrict: 'E',
    templateUrl: './../views/footer.html',
    controller: 'mainCtrl'
  };
});
// End: This is the footer directive ===========================================
'use strict';

// Start: This is the header directive =========================================
AA.directive('headerDirective', function () {

  return {
    restrict: 'E',
    templateUrl: './../views/header.html',
    controller: 'mainCtrl'
  };
});
// End: This is the header directive ===========================================
'use strict';

// Start: This is the Weather Service ==========================================
AA.service('weatherService', function ($http) {

  var baseUrl2 = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  var apiKey = 'c54910d1ae4d8e9e7e5bbda457d4ba22';

  this.getCurrentWeather = function () {
    return $http.get('http://ip-api.com/json').then(function (response) {
      return response.data.city;
    });
  };
  this.getWeather = function (city) {
    //console.log('at service');
    return $http.get(baseUrl2 + city + "&appid=" + apiKey).then(function (response) {
      //console.log('got responce');
      return response.data;
    });
  };
});
// End: This is the Weather Service ============================================
//# sourceMappingURL=bundle.js.map
