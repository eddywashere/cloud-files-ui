'use strict';

describe('Service: CloudFiles', function () {

  // load the service's module
  beforeEach(module('cloudFilesUiApp'));

  // instantiate service
  var CloudFiles;
  beforeEach(inject(function (_CloudFiles_) {
    CloudFiles = _CloudFiles_;
  }));

  it('should do something', function () {
    expect(!!CloudFiles).toBe(true);
  });

});
