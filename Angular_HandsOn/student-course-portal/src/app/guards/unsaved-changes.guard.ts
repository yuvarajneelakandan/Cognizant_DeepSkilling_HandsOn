import { CanDeactivateFn } from '@angular/router';

export const unsavedChangesGuard: CanDeactivateFn<any> = (component) => {

  if (component.canDeactivate) {
    return component.canDeactivate();
  }

  return true;

};