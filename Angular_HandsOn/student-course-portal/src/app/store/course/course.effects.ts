import { inject } from '@angular/core';

import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';

import {
  catchError,
  map,
  of,
  switchMap
} from 'rxjs';

import { CourseService } from '../../services/course.service';

import {
  loadCourses,
  loadCoursesFailure,
  loadCoursesSuccess
} from './course.actions';

export const loadCoursesEffect = createEffect(
  (
    actions$ = inject(Actions),
    courseService = inject(CourseService)
  ) => {

    return actions$.pipe(

      ofType(loadCourses),

      switchMap(() =>

        courseService.getCourses().pipe(

          map(courses =>
            loadCoursesSuccess({ courses })
          ),

          catchError(error =>
            of(
              loadCoursesFailure({
                error: error.message
              })
            )
          )

        )

      )

    );

  },
  {
    functional: true
  }
);