// Start: This is the Weather Service ==========================================
AA.service('weatherService', function($http){

  var baseUrl2 = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  var apiKey = 'c54910d1ae4d8e9e7e5bbda457d4ba22';

  this.getCurrentWeather = function(){
    return $http.get('http://ip-api.com/json').then(function(response){
    return response.data.city;
     })
  };
  this.getWeather = function(city){
    console.log('at service');
     return $http.get(baseUrl2+city+"&appid="+apiKey).then(function(response){
       console.log('got responce');
       //console.log('This is the one:', response.data);
       return response.data;
     })
  };

});
// End: This is the Weather Service ============================================
