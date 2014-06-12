'use strict';
/**
 * Created by perstrom on 2014-03-28.
 * Description:
 */

angular.module('clientApp')
  .controller('EditCtrl', function ($scope, $timeout, $modalInstance, $state, project, projects, disciplines, cities, levels, types, Common) {

    var initProject = angular.copy(project);
    $scope.project = angular.copy(project);

    Common.storeProductWhileEdit = $scope.project;

    /**
     * Set all drop down values
     *
     *
     * */
    $scope.levels = levels;
    var levelPosition = levels.map(function (x) {
      return x.id;
    }).indexOf($scope.project.prj_level);
    $scope.level = levels[levelPosition];

    $scope.changeLevel = function (level) {
      $scope.project.prj_level = level.id;
    };

    $scope.types = types;
    var typePosition = types.map(function (x) {
      return x.id;
    }).indexOf($scope.project.prj_type);
    $scope.type = types[typePosition];

    $scope.changeType = function (type) {
      $scope.project.prj_type = type.id;
    };

    $scope.cities = cities;
    var cityPosition = cities.map(function (x) {
      return x.id;
    }).indexOf($scope.project.prj_city);
    $scope.city = cities[cityPosition];

    $scope.changeCity = function (city) {
      $scope.project.prj_city = city.id;
    };

    $scope.disciplines = disciplines;
    var disciplinePosition = disciplines.map(function (x) {
      return x.id;
    }).indexOf($scope.project.prj_discipline);
    $scope.discipline = disciplines[disciplinePosition];

    $scope.changeDiscipline = function (discipline) {
      $scope.project.prj_discipline = discipline.id;
    };

    $scope.project = project;

    $scope.editMode = {
      active: false,
      levelOne: false,
      saveApproved: false
    };

    /**Let the user reset all the changes**/
    $scope.reset = function () {
      $scope.editMode.active = false;
      $scope.deActivateEdit();
      $scope.project = angular.copy(initProject);
      $scope.type = $scope.types[typePosition];
      $scope.level = $scope.levels[levelPosition];
      $scope.city = $scope.cities[cityPosition];
      $scope.discipline = $scope.disciplines[disciplinePosition];
    };

    $scope.startEdit = function () {
      $scope.editMode.active = true;
      $scope.project.prj_changed_by = '';
      $scope.project.prj_changed_date = new Date();
      $scope.editMode.saveApproved = false;
    };

    /**Check that the users enters six chars (legth of Sweco Login), then enable edit**/
    $scope.$watch('project.prj_changed_by', function () {
      if ($scope.editMode.active) {
        if ($scope.project.prj_changed_by.length === 6) {
          $scope.editMode.saveApproved = true;
        } else {
          $scope.editMode.saveApproved = false;
        }
      }
    });

    $scope.deActivateEdit = function () {
      $scope.editMode.levelOne = false;
      $scope.editMode.levelTwo = false;
      $scope.editMode.saveApproved = false;
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    /**Messages to let the user now if the save was successful or not**/
    $scope.alert = {
      type: 'success',
      msg: 'Uppgifter uppdaterade.'
    };

    $scope.alertFail = {
      type: 'danger'
    };

    $scope.save = function () {
      $scope.project.$save(function () {
        /**Notify the user for a few second that the post was successful**/
        $scope.requested = true;
        $scope.deActivateEdit();
        Common.storeProductWhileEdit = $scope.project;
        $timeout(function () {
          $scope.requested = false;
        }, 3000);
      }, function (err) {
        $scope.requestedFail = true;
        $scope.alertFail.msg = 'Något gick fel! Projektet kunde ej sparas. Felmeddelande: ' + err.data.clientError.message;
      });
    };
  });