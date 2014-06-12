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
  var mockBackend;
  beforeEach(inject(function($rootScope, $controller, _$httpBackend_) {
    $scope = $rootScope.$new();
    mockBackend= _$httpBackend_;
    ctrl = $controller('MainCtrl', {
      $scope: $scope,
      projects: [1, 2, 3],
      cities: [
        {
          title:'Stockholm',
          activated: true
        },
        {
          title:'Göteborg',
          activated: false
        }
      ],
      types: [
        {
          title:'Stockholm',
          activated: true
        },
        {
          title:'Göteborg',
          activated: false
        }
      ],
      disciplines: [
        {
          title:'Stockholm',
          activated: true
        },
        {
          title:'Göteborg',
          activated: false
        }
      ],
      levels: [
        {
          title:'Stockholm',
          activated: true
        },
        {
          title:'Göteborg',
          activated: false
        }
      ]
    });
  }));

  it('should return true when one of the the filter is not activad (the filter is active)', function(){
    //expect($scope.filterActive('cities')).toEqual(true);
  });

  it('should have a list with cities', function(){
    expect($scope.cities[0].activated).toEqual(true);
  });

  it('should have a list with disciplines', function () {
    expect($scope.disciplines[0].activated).toEqual(true);
  });

  it('should have a list with levels', function () {
    expect($scope.levels[0].activated).toEqual(true);
  });


  it('should have a list with types', function () {
    expect($scope.types[0].activated).toEqual(true);
  });

});


