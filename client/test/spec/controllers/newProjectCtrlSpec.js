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
  var mockBackend,
    modalInstance;

  modalInstance = {                    // Create a mock object using spies
    close: jasmine.createSpy('modalInstance.close'),
    dismiss: jasmine.createSpy('modalInstance.dismiss'),
    result: {
      then: jasmine.createSpy('modalInstance.result.then')
    }
  };
  beforeEach(inject(function ($rootScope, $controller, _$httpBackend_) {
    scope = $rootScope.$new();
    mockBackend = _$httpBackend_;
    disciplines = [];
    cities = [];
    levels = [];
    types = [];
    ctrl = $controller('NewProjectCtrl', {
      $scope: scope,
      $modalInstance: modalInstance,
      disciplines: disciplines,
      cities: cities,
      levels: levels,
      projects: [{prj_id:6}, {prj_id:7}],
      types: types
    });
  }));

  it('should return status 200 when posting data', function () {
    //console.log(scope.project);
    scope.submit();
    mockBackend.expectPOST('/fyra/api/project').respond(200,{prj_id: 2});
    mockBackend.flush();
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