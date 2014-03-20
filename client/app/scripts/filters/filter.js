'use strict';

/**
 * Created by perstrom on 2014-03-20.
 * Describe: Custom filters
 */

angular.module('filters', []).
  filter('matchProjects', function () {
    return function (projects, cities) {
      //console.log(cities);
      var filtered = [];
      angular.forEach(projects, function (project) {
        for (var i = 0; i < cities.length; i++) {
          if (cities[i].title === project.ci_title && cities[i].activated === true) {
            filtered.push(project);
          }
        }
      });

      return filtered;
    };
  });
