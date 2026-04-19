import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nav {
  protected creds: any = {}
  protected accountService = inject(AccountService);
  login() : void {
    this.accountService.login(this.creds).subscribe({
      next: result => {
   
    
      },
      error: error => alert(error.message)
    })
  }

  logout(): void {
    this.accountService.logout();
    this.creds = {};
  }
}
