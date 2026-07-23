import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Course } from '../models/course.model';
import { CourseService } from './course.service';

export interface Student {
  id: number;
  name: string;
  email: string;
}

interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourseIds: number[] = [];

  private enrollmentUrl = 'http://localhost:3000/enrollments';
  private studentUrl = 'http://localhost:3000/students';

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  enroll(courseId: number): void {

    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }

  }

  unenroll(courseId: number): void {

    this.enrolledCourseIds =
      this.enrolledCourseIds.filter(id => id !== courseId);

  }

  isEnrolled(courseId: number): boolean {

    return this.enrolledCourseIds.includes(courseId);

  }

  getEnrolledCourses(): Observable<Course[]> {

    if (this.enrolledCourseIds.length === 0) {
      return of([]);
    }

    const requests = this.enrolledCourseIds.map(id =>
      this.courseService.getCourseById(id)
    );

    return forkJoin(requests);

  }

  getStudentsByCourse(courseId: number): Observable<Student[]> {

    return this.http
      .get<Enrollment[]>(
        `${this.enrollmentUrl}?courseId=${courseId}`
      )
      .pipe(

        switchMap((enrollments: Enrollment[]) => {

          if (enrollments.length === 0) {
            return of([] as Student[]);
          }

          const studentRequests: Observable<Student>[] =
            enrollments.map((enrollment: Enrollment) =>
              this.http.get<Student>(
                `${this.studentUrl}/${enrollment.studentId}`
              )
            );

          return forkJoin(studentRequests);

        })

      );

  }

}