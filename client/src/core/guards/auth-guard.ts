import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { ToasterService } from '../services/toaster-service';

export const authGuard: CanActivateFn = () => {
  const accounService = inject(AccountService);
  const toasterService = inject(ToasterService);
  if(accounService.currentUser()) {
    return true;
  } else {
    toasterService.error('You must be logged in to access this page.');
    return false;
  }
};
