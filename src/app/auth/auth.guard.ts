import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { isLoggedIn } from './auth.selectors';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>, private router: Router, private service: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.pipe(select(isLoggedIn)).pipe(tap(loggedIn => {
      if (!loggedIn) {
        this.service.storeRouterState(state);
        this.router.navigateByUrl('/');
      }
    }));
  }
}
