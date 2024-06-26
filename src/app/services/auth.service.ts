import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { User } from '../models/app.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private router = inject(Router);
  private valueSubject = new BehaviorSubject<any>(null);
  role$ = this.valueSubject.asObservable();

  constructor() {
    const value = localStorage.getItem('role');
    if (value) {
      this.valueSubject.next(JSON.parse(value));
    }
  }

  setuserData(user: User) {
    this.valueSubject.next(user);
    localStorage.setItem('role', JSON.stringify(user.role));
  }

  /**
   * Sign in
   *
   * @param credentials
   */

  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient
      .post(`${environment.serverUrl}api/login`, credentials)
      .pipe(
        switchMap((response: any) => {
          console.log('resp user', response);
          // Set the authenticated flag to true
          this._authenticated = true;
          this.setuserData(response.data);
          localStorage.setItem('session', JSON.stringify(this._authenticated));
          // Return a new observable with the response
          return of(response);
        })
      );
  }

  signOut(): Observable<any> {
    return this._httpClient.post(`${environment.serverUrl}api/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('role');
        this._authenticated = false;
        localStorage.setItem('session', JSON.stringify(this._authenticated));

        this.router.navigate(['/login']);
      })
    );
  }

  check(): Observable<boolean> {
    const session = localStorage.getItem('session');
    const sessionBool = session === 'true';
    return of(sessionBool);
  }
}
