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
          }],
          cities: ['MultiCityLoader', function (MultiCityLoader) {
            return new MultiCityLoader();
          }],
          disciplines: ['MultiDisciplineLoader', function (MultiDisciplineLoader) {
            return new MultiDisciplineLoader();
          }],
          levels: ['MultiLevelLoader', function (MultiLevelLoader) {
            return new MultiLevelLoader();
          }],
          types: ['MultiTypeLoader', function (MultiTypeLoader) {
            return new MultiTypeLoader();
          }]
        },
        controller: 'MainCtrl'
      });
  });
