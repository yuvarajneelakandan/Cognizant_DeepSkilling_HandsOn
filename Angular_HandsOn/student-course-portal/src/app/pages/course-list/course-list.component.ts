import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCardComponent, HighlightDirective],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {

  isLoading = true;

  courses = [
    {
      id: 1,
      name: 'Angular Fundamentals',
      code: 'ANG101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'Java Programming',
      code: 'JAVA201',
      credits: 3,
      gradeStatus: 'pending'
    },
    {
      id: 3,
      name: 'Database Management Systems',
      code: 'DBMS301',
      credits: 4,
      gradeStatus: 'failed'
    },
    {
      id: 4,
      name: 'Web Technologies',
      code: 'WEB401',
      credits: 3,
      gradeStatus: 'passed'
    },
    {
      id: 5,
      name: 'Cloud Computing',
      code: 'CC501',
      credits: 4,
      gradeStatus: 'pending'
    }
  ];

  selectedCourseId: number | null = null;

  ngOnInit(): void {

    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

  }

  onEnroll(courseId: number): void {

    console.log('Enrolling in course:', courseId);
    this.selectedCourseId = courseId;

  }

  // trackBy improves performance by allowing Angular
  // to reuse existing DOM elements instead of recreating them.
  trackByCourseId(index: number, course: any): number {
    return course.id;
  }

}