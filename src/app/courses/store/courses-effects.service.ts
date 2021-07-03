import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { CoursesHttpService } from '../services/courses-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as CoursesActions from './course.actions';

@Injectable()
export class CoursesEffectsService {
  onLoadCourses = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadAllCourses),
      concatMap(() =>
        this.service.findAllCourses().pipe(
          map(cources => CoursesActions.allCoursesLoaded({ cources })),
          catchError(error => of(CoursesActions.allCoursesLoadError({ error }))))
      ),
    );
  });

  onCourseUpdated$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.courseUpdated),
      concatMap(async (action) => {
        const { id, changes } = action.update;
        await this.service.saveCourse(id, changes).toPromise();
        this._snackBar.open('Course Updated', '', {
          duration: 2000,
          politeness: 'polite'
        });
      }));
  }, { dispatch: false });

  constructor(private actions$: Actions, private service: CoursesHttpService, private _snackBar: MatSnackBar) { }
}
