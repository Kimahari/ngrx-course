import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { concatMap, filter, first, map, tap } from 'rxjs/operators';
import { CourseEntityService } from './course-entity.service';

@Injectable()
export class CoursesResolverService implements Resolve<boolean> {

  constructor(private service: CourseEntityService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.service.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.service.getAll();
        }
      }),
      filter(oo => oo === true),
      first()
    );
  }
}
