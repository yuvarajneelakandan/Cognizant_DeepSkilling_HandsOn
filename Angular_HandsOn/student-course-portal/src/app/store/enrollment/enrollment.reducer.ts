import { createReducer, on } from '@ngrx/store';

import {
  enrollInCourse,
  setEnrolledCourses,
  unenrollFromCourse
} from './enrollment.actions';

export interface EnrollmentState {

  enrolledCourseIds: number[];

}

export const initialEnrollmentState: EnrollmentState = {

  enrolledCourseIds: []

};

export const enrollmentReducer = createReducer(

  initialEnrollmentState,

  on(enrollInCourse, (state, { courseId }) => {

    if (state.enrolledCourseIds.includes(courseId)) {
      return state;
    }

    return {

      ...state,

      enrolledCourseIds: [
        ...state.enrolledCourseIds,
        courseId
      ]

    };

  }),

  on(unenrollFromCourse, (state, { courseId }) => ({

    ...state,

    enrolledCourseIds:
      state.enrolledCourseIds.filter(
        id => id !== courseId
      )

  })),

  on(setEnrolledCourses, (state, { courseIds }) => ({

    ...state,

    enrolledCourseIds: courseIds

  }))

);