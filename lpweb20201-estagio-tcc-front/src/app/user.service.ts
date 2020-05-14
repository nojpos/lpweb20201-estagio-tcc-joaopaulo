import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private auth$: AuthService) {
  }

  list() {
    return this.http.get(this.API_URL.concat('users/'), this.auth$.httpOptions());
  }
}
