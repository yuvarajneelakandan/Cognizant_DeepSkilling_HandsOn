import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

/* ---------------------- Custom Validators ---------------------- */

export function noCourseCode(control: AbstractControl): ValidationErrors | null {

  const value = control.value;

  if (value && value.toString().startsWith('XX')) {
    return { noCourseCode: true };
  }

  return null;

}

export const simulateEmailCheck: AsyncValidatorFn = (
  control: AbstractControl
) => {

  return new Promise<ValidationErrors | null>((resolve) => {

    setTimeout(() => {

      if (control.value && control.value.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }

    }, 800);

  });

};

/* ---------------------- Component ---------------------- */

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.component.html',
  styleUrl: './reactive-enrollment-form.component.css'
})
export class ReactiveEnrollmentFormComponent implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck]
      ],

      courseId: [
        '',
        [Validators.required, noCourseCode]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([])

    });

  }

  // Getter for FormArray
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Returns a FormControl from the FormArray
  getCourseControl(index: number): FormControl {
    return this.additionalCourses.at(index) as FormControl;
  }

  addCourse(): void {

    this.additionalCourses.push(
      new FormControl('', Validators.required)
    );

  }

  removeCourse(index: number): void {

    this.additionalCourses.removeAt(index);

  }

  onSubmit(): void {

    console.log('Form Value:', this.enrollForm.value);

    // value excludes disabled controls.
    // getRawValue() includes disabled controls.
    console.log('Raw Value:', this.enrollForm.getRawValue());

  }

  canDeactivate(): boolean {

  if (!this.enrollForm.dirty) {
    return true;
  }

  return window.confirm(
    'You have unsaved changes. Leave?'
  );

}

}