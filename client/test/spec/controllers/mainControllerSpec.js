'use strict';

var $scope, ctrl;
//you need to indicate your module in a test
beforeEach(module('clientApp'));
beforeEach(function() {
  this.addMatchers({
    toEqualData: function(expected) {
      return angular.equals(this.actual, expected);
    }
  });
});

describe('MainCtrl', function() {
  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    ctrl = $controller('MainCtrl', {
      $scope: $scope,
      projects: [1, 2, 3]
    });
  }));

  it('should have a list with cities', function(){
    expect($scope.cities[0].activated).toEqual(true);
  });
});

