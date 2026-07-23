import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {

  enrolledCourses: Course[] = [];

  constructor(
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {

    this.loadEnrolledCourses();

  }

  loadEnrolledCourses(): void {

    this.enrollmentService.getEnrolledCourses().subscribe({

      next: (courses) => {
        this.enrolledCourses = courses;
      },

      error: (error) => {
        console.error('Unable to load enrolled courses:', error);
      }

    });

  }

}