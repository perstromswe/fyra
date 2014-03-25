'use strict';

/**
 * Created by perstrom on 2014-03-24.
 * Description: Tests for adding new projects
 */


var scope, ctrl, disciplines, cities, levels, types;
//you need to indicate your module in a test
beforeEach(module('clientApp'));
beforeEach(function () {
  this.addMatchers({
    toEqualData: function (expected) {
      return angular.equals(this.actual, expected);
    }
  });
});


describe('NewProjectCtrl', function () {
  var mockBackend;
  beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
    scope = $rootScope.$new();
    mockBackend = _$httpBackend_;
    disciplines = [];
    cities = [];
    levels = [];
    types = [];
    ctrl = $controller('NewProjectCtrl', {
      $scope: scope,
      disciplines: disciplines,
      cities: cities,
      levels: levels,
      types: types
    });
  }));

  it('should return status 200 when posting data', function () {
    scope.submit();
    //mockBackend.expectPOST('/api/project', {title: 'test'}).respond({id: 2});
    //mockBackend.flush();
  });

  /*

   it('should have a list with disciplines for the discipline tag', function(){
   expect($scope.disciplines[0]).toBeDefined();
   });

   it('should have a list with types for the type tag', function(){
   expect($scope.types[0]).toBeDefined();
   });

   it('should have a list with levels for the level tag', function(){
   expect($scope.levels[0]).toBeDefined();
   });
   */

});