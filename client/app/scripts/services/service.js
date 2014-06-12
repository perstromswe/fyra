'use strict';

/**
 * Created by perstrom on 2014-03-18.
 * Description: REST-api communciation
 */

angular.module('clientApp.services', ['ngResource'])
  .factory('Common', function () {
    var Common = {
      storeProductWhileEdit: '',
      combineArrays: function (arrayWithTitles, arrayWithIds) {
        var length = arrayWithTitles.length,
          combinedArray = [];
        for (var i = 0; i < length; i++) {
          combinedArray.push({
            title: arrayWithTitles[i],
            id: arrayWithIds[i],
            activated: true
          });
        }
        var sortedArray = _.sortBy(combinedArray, function(o) { return o.title; });
        return sortedArray;
      },
      addActivatedKey: function (array) {
        var arrayWithKey = [];
        for (var i = 0; i < array.length; i++) {
          arrayWithKey.push(
            {
              title: array[i],
              activated: true
            }
          );
        }
        return arrayWithKey;
      },
      calculateHoursAndPricePerSqm: function (projects) {
        var projectsWithPrice = [];
        angular.forEach(projects, function (project) {
          this.push(project);
          project.prj_price_offer_per_sqm = Math.round(project.prj_price_offer / project.prj_area);
          project.prj_price_final_per_sqm = Math.round(project.prj_price_final / project.prj_area);
          project.prj_hours_per_sqm = Math.round((project.prj_hours / project.prj_area)*100)/100;
        }, projectsWithPrice);
        return projectsWithPrice;
      },
      calculateAveragePriceAndHours: function (projects) {

        var obj = {},
          offerPrice = 0,
          finalPrice = 0,
          hours = 0;
        angular.forEach(projects, function (project) {
          offerPrice += project.prj_price_offer_per_sqm;
          finalPrice += project.prj_price_final_per_sqm;
          hours += project.prj_hours_per_sqm;

        });
        obj.averageOfferPrice = Math.round(offerPrice / projects.length);
        obj.averageFinalPrice = Math.round(finalPrice / projects.length);
        obj.averageHours = Math.round((hours / projects.length)*100)/100;
        return obj;
      }
    };
    return Common;
  })
  .factory('Project', function ($resource) {
    return $resource('/fyra/api/project/:prj_id', {'prj_id': '@prj_id'});
  })
  .factory('MultiProjectsLoader', function (Project, $q) {
      return function () {
        var delay = $q.defer();
        Project.query(function (projects) {
          delay.resolve(projects);
        }, function () {
          delay.reject('Unable to fetch projects');
        });
        return delay.promise;
      };
    }
  )
  .factory('City', function ($resource) {
    return $resource('/fyra/api/city');
  })
  .factory('MultiCityLoader', function (City, $q) {
      return function () {
        var delay = $q.defer();
        City.query(function (cities) {
          delay.resolve(cities);
        }, function () {
          delay.reject('Unable to fetch cities');
        });
        return delay.promise;
      };
    }
  )
  .factory('Type', function ($resource) {
    return $resource('/fyra/api/type');
  })
  .factory('MultiTypeLoader', function (Type, $q) {
      return function () {
        var delay = $q.defer();
        Type.query(function (types) {
          delay.resolve(types);
        }, function () {
          delay.reject('Unable to fetch types');
        });
        return delay.promise;
      };
    }
  )
  .factory('Level', function ($resource) {
    return $resource('/fyra/api/level');
  })
  .factory('MultiLevelLoader', function (Level, $q) {
    return function () {
      var delay = $q.defer();
      Level.query(function (levels) {
        delay.resolve(levels);
      }, function () {
        delay.reject('Unable to fetch levels');
      });
      return delay.promise;
    };
  }
)
  .factory('Discipline', function ($resource) {
    return $resource('/fyra/api/discipline');
  })
  .factory('MultiDisciplineLoader', function (Discipline, $q) {
    return function () {
      var delay = $q.defer();
      Discipline.query(function (disciplines) {
        delay.resolve(disciplines);
      }, function () {
        delay.reject('Unable to fetch disciplines');
      });
      return delay.promise;
    };
  }
);


