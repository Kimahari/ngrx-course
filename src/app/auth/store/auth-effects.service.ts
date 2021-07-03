import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAuth from './../auth.actions';


@Injectable()
export class AuthEffectsService {
  onUserLogin$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuth.login, fromAuth.appRestoreCredentials),
    tap((state) => localStorage.setItem('user', JSON.stringify(state.user)))), { dispatch: false });

  onUserLogout$ = createEffect(() => this.actions$.pipe(
    ofType(fromAuth.logout),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })), { dispatch: false });

  constructor(private actions$: Actions, private router: Router) { }
}
