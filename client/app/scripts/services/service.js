'use strict';

/**
 * Created by perstrom on 2014-03-18.
 * Description: REST-api communciation
 */

angular.module('clientApp.services', ['ngResource'])
  .factory('Common', function () {
    var Common = {
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
        return combinedArray;
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
      calculatePricesInProjects: function (projects) {
        var projectsWithPrice = [];
        angular.forEach(projects, function (project) {
          this.push(project);
          project.prj_price_offer_per_sqm = Math.round(project.prj_price_offer / project.prj_area);
          project.prj_price_final_per_sqm = Math.round(project.prj_price_final / project.prj_area);
        }, projectsWithPrice);
        return projectsWithPrice;
      },
      calculateAveragePrice: function (projects) {
        var obj = {},
          offerPrice = 0,
          finalPrice = 0;
        angular.forEach(projects, function (project) {
          offerPrice += project.prj_price_offer_per_sqm;
          finalPrice += project.prj_price_final_per_sqm;
        });
        obj.averageOfferPrice = Math.round(offerPrice / projects.length);
        obj.averageFinalPrice = Math.round(finalPrice / projects.length);
        return obj;
      }
    };
    return Common;
  })
  .factory('Project', function ($resource) {
    return $resource('/api/project/:prj_id', {'prj_id': '@prj_id'});
  })
  .factory('MultiProjectsLoader', ['Project', '$q', '$stateParams',
    function (Projects, $q) {
      return function () {
        var delay = $q.defer();
        Projects.query(function (projects) {
          delay.resolve(projects);
        }, function () {
          delay.reject('Unable to fetch sizes');
        });
        return delay.promise;
      };
    }
  ]);

