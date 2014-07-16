'use strict';

describe('Directive: dnd', function () {

  // load the directive's module
  beforeEach(module('cloudFilesUiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dnd></dnd>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dnd directive');
  }));
});
