'use strict';

angular.module('clientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'clientApp.services',
  'filters',
  'ui.bootstrap',
  'ui-rangeSlider'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/');
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        resolve: {
          projects: ['MultiProjectsLoader', function (MultiProjectsLoader) {
            return new MultiProjectsLoader();
          }]
        },
        controller: 'MainCtrl'
      });
  });
