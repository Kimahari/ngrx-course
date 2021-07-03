import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private prevRouterState: RouterStateSnapshot;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', { email, password });
  }

  storeRouterState(state: RouterStateSnapshot) {
    this.prevRouterState = state;
  }

  async goToState(): Promise<boolean> {
    if (!this.prevRouterState) { return false; }
    return await this.router.navigateByUrl(this.prevRouterState.url);
  }
}
