'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $filter, $modal, projects, Common) {

    $scope.projects = Common.calculatePricesInProjects(projects);

    /**Create an array with title, id and activatedProperty on all cities in projects**/
    var cityTitles = _.uniq(_.pluck(projects, 'ci_title')),
      cityIds = _.uniq(_.pluck(projects, 'ci_id'));
    $scope.cities = Common.combineArrays(cityTitles, cityIds);

    /**Create an array with title, id and activatedProperty on all disciplines in projects**/
    var disciplinesTitles = _.uniq(_.pluck(projects, 'di_title')),
      disciplinesIds = _.uniq(_.pluck(projects, 'di_id'));
    $scope.disciplines = Common.combineArrays(disciplinesTitles, disciplinesIds);

    /**Create an array with title, id and activatedProperty on all levels in projects**/
    var levelsTitles = _.uniq(_.pluck(projects, 'le_title')),
      levelsIds = _.uniq(_.pluck(projects, 'le_id'));
    $scope.levels = Common.combineArrays(levelsTitles, levelsIds);

    /**Create an array with title, id and activatedProperty on all types in projects**/
    var typesTitles = _.uniq(_.pluck(projects, 'ty_title')),
      typesIds = _.uniq(_.pluck(projects, 'ty_id'));
    $scope.types = Common.combineArrays(typesTitles, typesIds);

    /**Checks all or dechecks all filters**/
    $scope.check = function (key, value) {
      angular.forEach($scope[key], function (obj) {
        obj.activated = value;
      });
    };

    /**Update the filters when any of the filters changes**/
    $scope.$watch('disciplinesTitles', function () {
      update();
    }, true);

    $scope.$watch('cities', function(){
      update();
    }, true);

    $scope.$watch('levels', function () {
      update();
    }, true);

    $scope.$watch('types', function () {
      update();
    }, true);

    function update() {
      var projects = $filter('matchProjects')($scope.projects, $scope.cities, $scope.disciplines, $scope.levels, $scope.types);
      $scope.nrOfProjectsFiltred = projects.length;
      $scope.averagePrice = Common.calculateAveragePrice(projects);
    }

    /**Post a new project**/
    $scope.newProject = function () {
      $modal.open({
        templateUrl: './template/modal/newProject.html',
        resolve: {
          disciplines: function () {
            return $scope.disciplines;
          },
          cities: function () {
            return $scope.cities;
          },
          levels: function () {
            return $scope.levels;
          },
          types: function () {
            return $scope.types;
          }
        },
        controller: 'NewProjectCtrl'
      });
    };
  });