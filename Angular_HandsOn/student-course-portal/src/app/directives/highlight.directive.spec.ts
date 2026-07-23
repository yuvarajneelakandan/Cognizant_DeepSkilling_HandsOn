import { ElementRef } from '@angular/core';

import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {

  it('should create an instance', () => {

    const mockElement =
      document.createElement('div');

    const elementRef =
      new ElementRef(mockElement);

    const directive =
      new HighlightDirective(elementRef);

    expect(directive).toBeTruthy();

  });

});