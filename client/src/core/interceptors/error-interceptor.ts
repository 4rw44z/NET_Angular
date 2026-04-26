import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToasterService } from '../services/toaster-service';
import { Router } from '@angular/router';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToasterService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(error => {
      if(error) {
        switch (error.status) {
          case 400:
            // toast.error(error.error);
            if (error.error.errors) {
              const modelStateErrors = [];
              for(const key in error.error.errors) {
                if(error.error.errors[key]) {
                  modelStateErrors.push(error.error.errors[key])
                }
                throw modelStateErrors.flat();
              }
            }
            else {
                toast.error(error.error)
              }
            break;
          
            case 401:
            toast.error("Unauthorized");
            break;
          
            case 404:
            router.navigateByUrl("/not-found");
            break;
          
            case 500:
            router.navigateByUrl("/server-error", { state: { error: error.error } });
            break;
            
          default:
            toast.error("An error occurred");
            break;
        }
      }
      throw error;
    })
  );
};
 