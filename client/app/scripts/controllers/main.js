'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $filter, $modal, $state, projects, Common) {
    //var projectsCopy = angular.copy(projects)
    $scope.projects = Common.calculateHoursAndPricePerSqm(projects);

    /**Get the oldest and newest project and attach it to the slider**/
    var years = _.pluck(projects, 'prj_year'),
      oldestYear = _.min(years),
      newestYear = _.max(years);

    $scope.sliderYears = {
      min: _.min(years),
      max: _.max(years),
      currentMin: oldestYear,
      currentMax: newestYear
    };

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

    $scope.setOjectInFilter = function (object, val) {
      object.activated = val;
    };

    $scope.search = '';

    $scope.filterActive = function(prop){
      var isActive = false;
      angular.forEach($scope[prop], function (value) {

        if(!value.activated){
          isActive = true;
        }
      });
      return isActive;
    };

    $scope.$watch('search', function () {
      update();
    });

    /**Update the filters when any of the filters changes**/
    $scope.$watch('disciplines', function () {
      update();
    }, true);

    $scope.$watch('cities', function () {
      update();
    }, true);

    $scope.$watch('levels', function () {
      update();
    }, true);

    $scope.$watch('types', function () {
      update();
    }, true);

    $scope.$watch('sliderYears', function () {
      update();
    }, true);

    function update() {
      var projects = $filter('matchProjects')($scope.projects, $scope.cities, $scope.disciplines, $scope.levels, $scope.types, $scope.search, $scope.sliderYears.currentMin, $scope.sliderYears.currentMax);
      $scope.nrOfProjectsFiltred = projects.length;
      $scope.average = Common.calculateAveragePriceAndHours(projects);
    }

    /**Post a new project. Modal has it's own controller: 'NewProjectCtrl**/
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

    /**Edit a project. Modal has it's own controller **/
    $scope.edit = function (id) {
      var project = _.where(projects, {prj_id: id});
      var modalInstance = $modal.open({
        templateUrl: './template/modal/editProject.html',
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
          },
          project: function () {
            return project[0];
          },
          projects: function () {
            return projects;
          }
        },
        controller: 'EditCtrl'
      });

      modalInstance.result.then(function () {
        $state.reload();
      }, function () {
        $state.reload();

        //var activeProject = _.where(projects, {prj_id: id});
        var projectsPosition = projects.map(function (x) {
          return x.prj_id;
        }).indexOf(id);

        projects[projectsPosition] = Common.storeProductWhileEdit;
        $scope.projects = Common.calculatePricesInProjects(projects);
        //$log.info('Modal dismissed at: ' + new Date());
      });
    };
  });