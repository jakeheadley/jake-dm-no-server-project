// Start: This is the main controller ==========================================
AA.controller('mainCtrl', function ($scope, weatherService) {

  $scope.getCurrentWeather = (function(){
    var promise = weatherService.getCurrentWeather();
    return promise.then(function (response)
    {
      return $scope.getWeather(response)
    });
  })();

  //$scope.monday
  //$scope.tuesday
  //$scope.wednesday
  

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
