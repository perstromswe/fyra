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

describe('CommonService', function () {
  var common,
    projects,
    projectsWithPrices,
    averagePrices;
  beforeEach(inject(function (Common) {
    common = Common;
    projects = [
      {
        prj_area: 4250,
        prj_price_offer: 140000,
        prj_price_final: 141100,
        prj_hours: 1500
      },
      {
        prj_area: 8000,
        prj_price_offer: 160000,
        prj_price_final: 350000,
        prj_hours: 3000
      }
    ];
    projectsWithPrices = Common.calculateHoursAndPricePerSqm(projects);
    averagePrices = Common.calculateAveragePriceAndHours(projectsWithPrices);
  }));

  it('should add three keys to projects: offer and final price per square meter and hours per sqm. Calculated from hours, price and area', function () {
    expect(projectsWithPrices[0].prj_price_offer_per_sqm).toEqual(33);
    expect(projectsWithPrices[0].prj_price_final_per_sqm).toEqual(33);
    expect(projectsWithPrices[0].prj_hours_per_sqm).toEqual(0.35);
    expect(projectsWithPrices[1].prj_price_offer_per_sqm).toEqual(20);
    expect(projectsWithPrices[1].prj_price_final_per_sqm).toEqual(44);
    expect(projectsWithPrices[1].prj_hours_per_sqm).toEqual(0.38);
  });

  it('should summarize the prices, calculate the average and return this with three properties', function () {
    expect(averagePrices.averageOfferPrice).toEqual(27);
    expect(averagePrices.averageFinalPrice).toEqual(39);
    expect(averagePrices.averageHours).toEqual(0.37);
  });
});