'use strict';

/**
 * Created by perstrom on 2014-03-20.
 * Describe: Custom filters
 */

angular.module('filters', []).
  filter('matchProjects', function ($filter) {
    return function (projects, cities, disciplines, levels, types, searchText, minYear, maxYear) {
      var filtered = [],
        cityExist,
        disciplineExist,
        levelExist,
        typeExist,
        searchFree,
        productsByFreeSearch,
        betweenYears;

      /**Loop through each project, and check if each filter property is fullfilled**/
      angular.forEach(projects, function (project) {
        cityExist = false;
        disciplineExist = false;
        levelExist = false;
        typeExist = false;
        searchFree = false;
        betweenYears = false;

        if (project.prj_year >= minYear && project.prj_year <= maxYear) {
          betweenYears = true;
        }

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
        if (cityExist && disciplineExist && levelExist && typeExist && betweenYears) {
          /**Also filter the project with the free text search**/
          if (searchText && searchText.length !== 0) {
            var productArray = [];
            var searchTerms = searchText.split(' ');
            // search for single terms.
            // this reduces the item list step by step
            searchTerms.forEach(function (term) {
              if (term && term.length) {
                productArray.push(project);
                productsByFreeSearch = $filter('filter')(productArray, term);
                /**Project was found. Let's push it in**/
                if (productsByFreeSearch.length === 1) {
                  filtered.push(project);
                }
              }
            });
          } else {
            /**Free text search is not enabled**/
            filtered.push(project);
          }
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
