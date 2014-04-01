'use strict';

/**
 * Created by perstrom on 2014-03-20.
 */

describe('MultiProjectsLoader', function () {
  var mockBackend, project, loader;
  // The _$httpBackend_ is the same as $httpBackend. Only written this way to
  // differentiate between injected variables and local variables
  beforeEach(inject(function (_$httpBackend_, Project, MultiProjectsLoader) {
    project = Project;
    mockBackend = _$httpBackend_;
    loader = MultiProjectsLoader;
  }));

  it('should load list of projects', function () {
    mockBackend.expectGET('/fyra/api/project').respond([
      {id: 1},
      {id: 2}
    ]);

    var projects;

    var promise = loader();
    promise.then(function (prj) {
      projects = prj;
    });

    expect(projects).toBeUndefined();

    mockBackend.flush();

    expect(projects).toEqualData([
      {id: 1},
      {id: 2}
    ]);
  });
});