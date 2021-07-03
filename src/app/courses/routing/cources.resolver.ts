import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { selectCoursesLoaded } from '../store/courses.selectors';
import { loadAllCourses } from './../store/course.actions';

@Injectable({ providedIn: 'root' })
export class CoursesResolver implements Resolve<boolean> {

  loading = false;

  constructor(private store: Store<any>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(
      select(selectCoursesLoaded),
      tap(coursesLoaded => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      first(loaded => loaded),
      finalize(() => this.loading = false));
  }
}
