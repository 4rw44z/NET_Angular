import { IUser } from './../../Models/user';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Register } from '../account/register/register';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected registerMode = signal(false);
  membersFromApi = input.required<IUser[]>(); // signal input instead of decorator
  
  
  showRegister(value: boolean): void {
    this.registerMode.set(value);
  }
}
