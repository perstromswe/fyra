'use strict';

/**
 * Created by perstrom on 2014-03-20.
 */

beforeEach(module('clientApp'));

beforeEach(function () {
  this.addMatchers({
    toEqualData: function (expected) {
      return angular.equals(this.actual, expected);
    }
  });
});

describe('Unit Testing: Filters - ', function () {
  var matchProjects;
  var cities = [
      {
        title: 'Göteborg',
        activated: true
      },
      {
        title: 'Mölndal',
        activated: true
      }
    ],
    disciplines = [
      {
        title: 'Rör + Ventilation',
        activated: true
      },
      {
        title: 'Rör',
        activated: false
      }
    ],
    levels = [
      {
        title: 'Systemhandling + Bygghandling',
        activated: true
      },
      {
        title: 'Bygghandling',
        activated: true
      }
    ],
    types = [
      {
        title: 'Sjukvård, hälsovård och labb',
        activated: true
      },
      {
        title: 'Fordons och verkstadsindustrianläggning',
        activated: true
      }
    ],
    projects = [
      {
        prj_id: 18,
        prj_title: 'Mölndalssjukhus Patient primärvård',
        prj_year: 2011,
        ci_title: 'Mölndal',
        di_title: 'Rör + Ventilation',
        le_title: 'Systemhandling + Bygghandling',
        ty_title: 'Sjukvård, hälsovård och labb'
      },
      {
        prj_id: 3,
        prj_title: 'Volvo Tcsv, spa',
        prj_year: 2012,
        ci_title: 'Göteborg',
        di_title: 'Rör + Ventilation',
        le_title: 'Systemhandling + Bygghandling',
        ty_title: 'Fordons och verkstadsindustrianläggning'
      },
      {
        prj_id: 1,
        prj_title: 'Amring-Logistikhall',
        prj_year: 2011,
        ci_title: 'Göteborg',
        di_title: 'Rör',
        le_title: 'Bygghandling',
        ty_title: 'Fordons och verkstadsindustrianläggning'
      }
    ];

  // load the module
  beforeEach(module('filters'));

  // load filter function into variable
  beforeEach(inject(function ($filter) {
    matchProjects = $filter('matchProjects');
  }));

  // test billShip filter
  it('should have a a matchProjects filter ', function () {
    expect(matchProjects).not.toEqual(null);
  });


  it('should filter two of the projcets', function () {
    expect(matchProjects(projects, cities, disciplines, levels, types).length).toEqual(2);
  });
});