import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToasterService } from '../../core/services/toaster-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Nav {
  protected creds: any = {}
  protected accountService = inject(AccountService);
  private router =  inject(Router);
  private toasterService = inject(ToasterService)
  login() : void {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
        this.router.navigateByUrl('/members')
        this.toasterService.success('logged in successfully');
    
      },
      error: error => {
        console.log(error);
        this.toasterService.error(error.error);

      }
    })
  }

  logout(): void {
    this.accountService.logout();
    this.creds = {};
    this.router.navigateByUrl('/');
  }
}
