import { AccountService } from './../../core/services/account-service';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ApiErrorService } from '../../core/services/api-error-service';
import { RegisterCreds } from '../../Models/user';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestErrors implements OnInit{
  private errorService = inject(ApiErrorService);
  private accountService = inject(AccountService);
  validationErrors = signal<string[]>([]);
  constructor() { }
  
  ngOnInit(): void {
  }

  check404Error(): void {
    this.errorService.get404Error().subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

  check500Error(): void {
    this.errorService.get500Error().subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

  check401Error(): void {
    this.errorService.get401Error().subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

  check400Error(): void {
    this.errorService.get400Error().subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

  check400ValidationError(): void {
    const registerModel: RegisterCreds = {
      email: '',
      displayName: '',
      password: '',
      gender: '',
      dateOfBirth: '',
      city: '',
      country: ''
    }
    this.accountService.register(registerModel).subscribe({
      next: data => console.log(data),
      error: error => this.validationErrors.set(error)
    })
  }
}
