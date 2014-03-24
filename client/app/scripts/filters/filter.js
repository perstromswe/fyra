'use strict';

/**
 * Created by perstrom on 2014-03-20.
 * Describe: Custom filters
 */

angular.module('filters', []).
  filter('matchProjects', function () {
    return function (projects, cities, disciplines, levels, types) {
      var filtered = [],
        cityExist,
        disciplineExist,
        levelExist,
        typeExist;

      /**Loop through each project, and check if each filter property is fullfilled**/
      angular.forEach(projects, function (project) {
        cityExist = false;
        disciplineExist = false;
        levelExist = false;
        typeExist = false;
        angular.forEach(cities, function (city) {
          if (city.title === project.ci_title && city.activated === true) {
            cityExist = true;
          }
        });

        angular.forEach(disciplines, function (discipline) {
          if (discipline.title === project.di_title && discipline.activated === true) {
            disciplineExist = true;
          }
        });

        angular.forEach(levels, function (level) {
          if (level.title === project.le_title && level.activated === true) {
            levelExist = true;
          }
        });

        angular.forEach(types, function (type) {
          if (type.title === project.ty_title && type.activated === true) {
            typeExist = true;
          }
        });

        /**If all criterias are fullfilled, we push the project to the filtred list**/
        if (cityExist && disciplineExist && levelExist && typeExist) {
          filtered.push(project);
        }
      });

      return filtered;
    };
  })
  .filter('checkNull', function () {
    return function (val) {
      if (!val) {
        return '-';
      } else {
        return val;
      }
    };
  });
