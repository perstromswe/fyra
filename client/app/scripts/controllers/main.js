'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $filter, projects, Common) {

    var projectsWithCalculatedPrices = Common.calculatePricesInProjects(projects);

    /**Create an array with all cities in projects**/
    var cities = _.uniq(_.pluck(projects, 'ci_title'));

    /**Add a 'activated' property to the cities so we can use it as filter**/
    $scope.cities = Common.addActivatedKeyToCities(cities);

    $scope.$watch('cities', function(){
      $scope.projects = $filter('matchProjects')(projectsWithCalculatedPrices, $scope.cities);
      $scope.averagePrice = Common.calculateAveragePrice($scope.projects);
    }, true);
  });