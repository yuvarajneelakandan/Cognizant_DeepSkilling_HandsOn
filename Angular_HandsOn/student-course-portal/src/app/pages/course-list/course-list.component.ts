import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';

import { Course } from '../../models/course.model';

import {
  EnrollmentService,
  Student
} from '../../services/enrollment.service';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  selectAllCourses,
  selectCoursesError,
  selectCoursesLoading
} from '../../store/course/course.selectors';


@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseCardComponent,
    HighlightDirective
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  // ---------------- Existing Properties ----------------

  searchTerm = '';

  selectedCourseId: number | null = null;

  enrolledStudents: Student[] = [];

  selectedCourse$ = new Subject<number>();


  // ---------------- NgRx State ----------------

  courses$: Observable<Course[]>;

  loading$: Observable<boolean>;

  error$: Observable<string | null>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    private store: Store
  ) {

    // Select course data from the NgRx store.
    this.courses$ =
      this.store.select(selectAllCourses);

    this.loading$ =
      this.store.select(selectCoursesLoading);

    this.error$ =
      this.store.select(selectCoursesError);

  }


  ngOnInit(): void {

    // Read search value from the URL query parameter.
    const search =
      this.route.snapshot.queryParamMap.get('search');

    if (search) {
      this.searchTerm = search;
    }


    // Dispatch NgRx action.
    // The Course Effect will perform the HTTP request.
    this.store.dispatch(loadCourses());


    // Load enrolled students when a course is selected.
    this.selectedCourse$
      .pipe(

        // switchMap cancels the previous request
        // if another course is selected.
        switchMap((courseId: number) =>
          this.enrollmentService.getStudentsByCourse(courseId)
        )

      )
      .subscribe({

        next: (students: Student[]) => {

          this.enrolledStudents = students;

        },

        error: (error: unknown) => {

          console.error(
            'Failed to load enrolled students:',
            error
          );

        }

      });

  }


  onEnroll(courseId: number): void {

    console.log(
      'Enrolling in course:',
      courseId
    );

    this.selectedCourseId = courseId;

  }


  showStudents(courseId: number): void {

    this.selectedCourseId = courseId;

    this.selectedCourse$.next(courseId);

  }


  viewCourse(courseId: number): void {

    this.router.navigate([
      'courses',
      courseId
    ]);

  }


  updateSearch(): void {

    this.router.navigate(
      ['courses'],
      {
        queryParams: {
          search: this.searchTerm || null
        }
      }
    );

  }


  // trackBy improves rendering performance because
  // Angular can reuse existing course elements.
  trackByCourseId(
    index: number,
    course: Course
  ): number {

    return course.id;

  }

}