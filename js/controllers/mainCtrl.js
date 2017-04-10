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

  $scope.getCurrentWeather = (function(){
    var promise = weatherService.getCurrentWeather();
    return promise.then(function (response)
    {
      return $scope.getWeather(response)
    });
  })();

  $scope.getWeather = function (city) {
    return weatherService.getWeather(city).then(function (response) {
      //console.log(response, "return response");
      $scope.weather = response;
      $scope.temp = (response.list[0].main.temp * (9 / 5) - 459.67).toFixed(1) + '°';
      $scope.speed = 'wind: ' + response.list[0].wind.speed + ' mph';


      $scope.fiveDays = [];
      for (var i=3; i<43; i+=8){
        response.list[i].main.temp = (response.list[i].main.temp * (9 / 5) - 459.67).toFixed(1) + '°';
        response.list[i].wind.speed  = 'wind: ' + response.list[0].wind.speed + ' mph';
        response.list[i].weather[0].icon = response.list[i].weather[0].description
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
