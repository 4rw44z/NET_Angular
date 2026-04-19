import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { IUser, RegisterCreds } from '../../Models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<IUser | null>(null);
  constructor() {
    effect(() => {
      const user = this.currentUser();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      else {
        localStorage.removeItem('user');
      }
    })
  }
  login(cred: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login/', cred).pipe(tap(
      user => {
        if(user) {
          this.currentUser.set(user);
          
        }
      }
    ));
  }

  register(creds:RegisterCreds) {
    return this.http.post<IUser>(this.baseUrl + 'account/register/', creds).pipe(tap(
      user => {
        if (user) {
          this.currentUser.set(user);
        }
      }
    ))
  }

  logout() {
    this.currentUser.set(null);
  }

}
