import { Routes } from '@angular/router';
import { unsavedChangesGuard } from '../../guards/unsaved-changes.guard';

export const ENROLLMENT_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('../../pages/enrollment-form/enrollment-form.component')
        .then(c => c.EnrollmentFormComponent)
  },

  {
    path: 'reactive',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('../../pages/reactive-enrollment-form/reactive-enrollment-form.component')
        .then(c => c.ReactiveEnrollmentFormComponent)
  }

];