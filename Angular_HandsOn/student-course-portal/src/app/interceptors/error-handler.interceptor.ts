import { inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      console.error('HTTP Error:', error);

      if (error.status === 401) {

        console.warn('Unauthorized request. Redirecting to home...');

        router.navigate(['/']);

      } else if (error.status === 500) {

        console.error(
          'Server error occurred. Please try again later.'
        );

      }

      // Propagate the error so components/services
      // can still handle it if required.
      return throwError(() => error);

    })

  );

};