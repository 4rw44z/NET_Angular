import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom, Subject } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { IUser } from '../Models/user';

@Component({
  selector: 'app-root',
  imports: [ Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');
  private http = inject(HttpClient)
  users: any;
  unsubscribe = new Subject<void>();
  protected members = signal<IUser[]>([]);
  private accountService = inject(AccountService);
  async ngOnInit() {
  this.members.set(await this.getMembers());
  this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user = localStorage.getItem('user');
    if(!user) return;
    this.accountService.currentUser.set(JSON.parse(user));
  }
  async getMembers() {
    try {
      return lastValueFrom(this.http.get<IUser[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
