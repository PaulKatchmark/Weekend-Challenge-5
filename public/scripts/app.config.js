angular.module('giphyApp')
       .config(function($routeProvider, $locationProvider) {
         $routeProvider.when('/home', {
           templateUrl: 'views/home.html',
           controller: 'HomeController as home'
         }).when('/favorites', {
           templateUrl: 'views/favorites.html'
         });

         $locationProvider.html5Mode(true);
       });