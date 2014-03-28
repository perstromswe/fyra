'use strict';

/**
 * Created by perstrom on 2014-03-24.
 * Description: Post a new project
 */


angular.module('clientApp')
  .controller('NewProjectCtrl', function ($scope, $http, $timeout, disciplines, cities, levels, types) {
    /**Set all drop down values**/
    $scope.disciplines = disciplines;
    $scope.discipline = disciplines[0];

    $scope.cities = cities;
    $scope.city = $scope.cities[0];

    $scope.levels = levels;
    $scope.level = $scope.levels[0];

    $scope.types = types;
    $scope.type = $scope.types[0];

    $scope.project = {
      prj_discipline: $scope.discipline,
      prj_city: $scope.city,
      prj_level: $scope.level,
      prj_type: $scope.type
    };

    /**Prepeare success and fail messages**/
    $scope.requestedFail = false;
    $scope.alert = {
      type: 'success',
      msg: 'Projekt tillagt! Du kan fortsätta lägga till projekt'
    };
    $scope.alertFail = {
      type: 'danger',
      msg: 'Något gick fel! Projektet blev ej inlagt.'
    };

    $scope.submit = function () {

      $http({
        method: 'POST',
        url: '/fyra/api/project',
        data: $.param($scope.project),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
      })
        .success(function (data, status) {
          if (status === 200) {
            $scope.requested = true;
            /**Notify the user for a few second that the post was successfull**/
            $timeout(function () {
              $scope.requested = false;
            }, 3000);
            /**Clear the input form**/
            $scope.project = {
              prj_number: '',
              prj_title: '',
              prj_year: '',
              prj_leader: '',
              prj_discipline: $scope.discipline,
              prj_city: $scope.city,
              prj_level: $scope.level,
              prj_type: $scope.type,
              prj_area: '',
              prj_price_offer: '',
              prj_price_final: ''
            };

          }
        })
        .error(function (data) {
          $scope.requestedFail = true;
          $scope.alertFail.msg = 'Något gick fel! Projektet blev ej inlagt. Felmeddelande: ' + data.clientError.message;
        });

    };

  });