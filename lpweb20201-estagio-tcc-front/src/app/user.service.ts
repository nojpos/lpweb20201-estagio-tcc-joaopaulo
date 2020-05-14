import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private auth$: AuthService) {
  }

  list() {
    return this.http.get(environment.API_URL.concat('users/'), this.auth$.httpOptions());
  }
}
