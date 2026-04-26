import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiErrorService {

  baseUrl = "https://localhost:5001/api/";
  private http = inject(HttpClient);

  get404Error() {
    return this.http.get(this.baseUrl + 'error/not-found');
  }

  get500Error() {
    return this.http.get(this.baseUrl + 'error/server-error');
  }
  
  get401Error() {
    return this.http.get(this.baseUrl + 'error/auth');
  }

  get400Error() {
    return this.http.get(this.baseUrl + 'bad-request')
  }
  
}
