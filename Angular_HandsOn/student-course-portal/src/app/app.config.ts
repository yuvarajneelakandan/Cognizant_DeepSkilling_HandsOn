
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { authInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  courseReducer
} from './store/course/course.reducer';

import {
  enrollmentReducer
} from './store/enrollment/enrollment.reducer';

import {
  loadCoursesEffect
} from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
providers: [

  provideRouter(routes),

  provideHttpClient(
    withInterceptors([
      authInterceptor,
      errorHandlerInterceptor,
      loadingInterceptor
    ])
  ),

  provideStore(),

  provideState(
    'course',
    courseReducer
  ),

  provideState(
    'enrollment',
    enrollmentReducer
  ),

  provideEffects({
    loadCoursesEffect
  }),

  provideStoreDevtools({
    maxAge: 25
  })

]
};