import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { CreditLabelPipe } from '../../pipes/credit-label.pipe';

import {
  enrollInCourse,
  unenrollFromCourse
} from '../../store/enrollment/enrollment.actions';

import {
  selectEnrolledIds
} from '../../store/enrollment/enrollment.selectors';


@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [
    CommonModule,
    CreditLabelPipe
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {

  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus: string;
  };

  @Output() enrollRequested =
    new EventEmitter<number>();

  isExpanded = false;

  enrolledIds$: Observable<number[]>;


  constructor(private store: Store) {

    this.enrolledIds$ =
      this.store.select(selectEnrolledIds);

  }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['course']) {

      console.log(
        'Course input changed:',
        changes['course']
      );

    }

  }


  toggleEnrollment(
    courseId: number,
    enrolledIds: number[]
  ): void {

    if (enrolledIds.includes(courseId)) {

      this.store.dispatch(
        unenrollFromCourse({ courseId })
      );

    } else {

      this.store.dispatch(
        enrollInCourse({ courseId })
      );

      // Preserve parent-child communication
      // introduced in Hands-On 2.
      this.enrollRequested.emit(courseId);

    }

  }


  toggleDetails(): void {

    this.isExpanded = !this.isExpanded;

  }


  // Getter keeps conditional styling logic
  // out of the HTML template.
  get cardClasses() {

    return {

      'card--enrolled': false,

      'card--full':
        this.course.credits >= 4,

      'expanded':
        this.isExpanded

    };

  }


  get borderColor(): string {

    switch (this.course.gradeStatus) {

      case 'passed':
        return 'green';

      case 'failed':
        return 'red';

      default:
        return 'gray';

    }

  }

}