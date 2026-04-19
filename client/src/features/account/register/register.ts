import { ChangeDetectionStrategy, Component, inject, OnInit, output } from '@angular/core';
import { RegisterCreds } from '../../../Models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as PATTERN from '../../../core/constants/validation-pattern';
import { AccountService } from '../../../core/services/account-service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register implements OnInit {
  protected creds = {} as RegisterCreds;
  registerForm!: FormGroup;
  cancelClicked = output<boolean>();  //output signal replaces angular @output decorator
  private accountService = inject(AccountService);
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(PATTERN.emailPattern)]),
      displayName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(PATTERN.passwordPattern)])
    });
  }
  register(): void {
    if (!this.registerForm.invalid) {
      console.log(this.registerForm.value);

      this.accountService.register(this.registerForm.value).subscribe({
        next: result => {
          console.log(result);
          this.cancel();
        },
        error: error => {
          console.error(error);
        }
      })
    }
  }

  cancel(): void {
    this.registerForm.reset();
    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
    this.cancelClicked.emit(false);
  }
}
