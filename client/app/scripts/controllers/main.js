'use strict';

angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $filter, $modal, $state, projects, Common) {
    //var projectsCopy = angular.copy(projects)
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

    $scope.$watch('cities', function () {
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
        controller: function ($scope, $timeout, $modalInstance, $state, project, projects, disciplines, cities, levels, types, Common) {
          var initProject = angular.copy(project);
          //var projects = angular.copy(projects);
          $scope.project = angular.copy(project);

          Common.storeProductWhileEdit = $scope.project;

          /**Set all drop down values**/
          $scope.disciplines = disciplines;
          var disciplineArray = _.where(disciplines, {id: $scope.project.di_id});
          $scope.discipline = disciplineArray[0];

          $scope.cities = cities;
          $scope.city = $scope.cities[0];

          $scope.levels = levels;
          var levelPosition = types.map(function (x) {
            return x.id;
          }).indexOf($scope.project.prj_level);
          $scope.level = types[levelPosition];

          $scope.types = types;
          var typePosition = types.map(function (x) {
            return x.id;
          }).indexOf($scope.project.prj_type);
          $scope.type = types[typePosition];
          var initType = angular.copy($scope.type);

          $scope.changeLevel = function (level) {
            $scope.project.prj_level = level.id
          };

          $scope.changeType = function (type) {
            $scope.project.prj_type = type.id;
          };

          $scope.dropDowns = {
            type: $scope.type
          }

          $scope.project = project;
          $scope.editMode = {
            active: false,
            levelOne: false,
            saveApproved: false
          };

          $scope.startEdit = function () {
            $scope.editMode.active = true;
            $scope.project.prj_changed_by = '';
            $scope.editMode.saveApproved = false;
          };

          $scope.$watch('project.prj_changed_by', function () {
            if ($scope.editMode.active) {
              if ($scope.project.prj_changed_by.length === 6) {
                $scope.editMode.saveApproved = true;
              } else {
                $scope.editMode.saveApproved = false;
              }
            }
          });

          $scope.reset = function () {
            $scope.editMode.active = false;
            $scope.deActivateEdit();
            $scope.project = angular.copy(initProject);
            $scope.type = angular.copy(initType);
          };

          $scope.deActivateEdit = function () {
            $scope.editMode.levelOne = false;
            $scope.editMode.levelTwo = false;
            $scope.editMode.saveApproved = false;
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };

          $scope.alert = {
            type: 'success',
            msg: 'Uppgifter uppdaterade.'
          };

          $scope.alertFail = {
            type: 'danger'
          };

          $scope.save = function () {
            $scope.project.$save(function () {
              /**Notify the user for a few second that the post was successfull**/
              $scope.requested = true;
              $scope.deActivateEdit();
              Common.storeProductWhileEdit = $scope.project;
              $timeout(function () {
                $scope.requested = false;
              }, 3000);
            }, function (err) {
              console.log(err);
              $scope.requestedFail = true;
              $scope.alertFail.msg = 'Något gick fel! Projektet kunde ej sparas. Felmeddelande: ' + err.clientError.message;
            });
          }
        }
      });

      modalInstance.result.then(function (test) {
        $state.reload();
      }, function () {
        $state.reload();

        var activeProject = _.where(projects, {prj_id: id});
        var projectsPosition = projects.map(function (x) {
          return x.prj_id;
        }).indexOf(id);

        projects[projectsPosition] = Common.storeProductWhileEdit;
        $scope.projects = Common.calculatePricesInProjects(projects);
        //$log.info('Modal dismissed at: ' + new Date());
      });
    }
  });